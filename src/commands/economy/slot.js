module.exports = {
    name: 'slot',
    aliases: ['bet'],
    category: 'economy',
    cool: 10,
    react: '✅',
    description: 'Bets the given amount of gold in a slot machine',
    async execute(client, arg, M) {
      const symbols = ['🍒', '🍊', '🖕'];
    const payoutTable = {
      '🍒🍒🍒': 5,
      '🍊🍊🍊': 10,
      '🖕🖕🖕': 15,
      '🍒🍊🖕': 20,
      '🖕🍊🍒': 20,
      '🍊🖕🍒': 20,
    };

    const maxSlotAmount = 100000000;
    if (arg > maxSlotAmount) {
      return M.reply(`You can't bet more than ${maxSlotAmount}.\n\n*Note:* This action has been taken to avoid bans.`);
    }

    if (!arg) {
      return M.reply('Please provide the amount.');
    }

    const amount = parseInt(arg);
    if (isNaN(amount)) {
      return M.reply('Please provide a valid amount.');
    }

    if (arg.startsWith('-') || arg.startsWith('+')) {
      return M.reply('Please provide a valid amount.');
    }

     const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0

    if (cradits < amount) {
      return M.reply("You don't have that much in your wallet.");
    }

    const spinResult = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      spinResult.push(symbols[randomIndex]);
    }

    const spinResultStr = spinResult.join('');
    const points = payoutTable[spinResultStr] || 0;
    
    // Set win rate to 30%
    const isWinner = Math.random() < 0.3;
    const resultAmount = isWinner ? amount * points : -amount;

    await client.cradit.add(`${M.sender}.wallet`, resultAmount - resultAmount/2)

    let text = '🎰 *SLOT MACHINE* 🎰\n\n';
    text += spinResult.join(' ') + '\n\n';
    text += isWinner ? `\n\n📉 You won ${resultAmount} dollars` : `\n\n📈 You lost ${amount} dollars`


    M.reply(text);
  }
};
