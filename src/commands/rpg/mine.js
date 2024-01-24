module.exports = {
  name: 'mine',
  aliases: ['mine'],
  category: 'rpg',
  exp: 5,
  react: '✅',
  description: 'Places a bet on the roulette wheel',
  async execute(client, arg, M) {
    const rouletteNumbers = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];
    const payoutTable = {
      '0': 36,
      '00': 36,
      '1-18': 2,
      '19-36': 2,
      '1st 12': 3,
      '2nd 12': 3,
      '3rd 12': 3,
    };
    
    // Validate the bet amount
    const maxBetAmount = 10000;
    if (arg > maxBetAmount) {
      return M.reply(`You can't bet more than ${maxBetAmount}.\n\n*Note:* This action has been taken to avoid bans.`);
    }
    
    if (!arg) {
      return M.reply('Please provide the bet amount.');
    }
    
    const betAmount = parseInt(arg);
    if (isNaN(betAmount) || betAmount <= 0) {
      return M.reply('Please provide a valid bet amount.');
    }
    
    const credits = client.cradit.get(`${M.sender}.wallet`) || 0;
    
    if (credits < betAmount) {
      return M.reply("You don't have that much in your wallet.");
    }
    
    const spinResult = rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
    const payoutMultiplier = payoutTable[spinResult] || 0;
    const resultAmount = payoutMultiplier <= 0 ? -betAmount : betAmount * payoutMultiplier;
    
    await client.cradit.add(`${M.sender}.wallet`, resultAmount);
    
    let text = '🎰 *FOREST* 🎰\n\n';
    text += `Spin Result: ${spinResult}\n\n`;
    text += payoutMultiplier <= 0 ? `📉 You lost ${betAmount} gold` : `📈 You won ${resultAmount} gold`;
    
    // Add diamond and emerald
    const diamondAmount = payoutMultiplier > 0 ? Math.floor(resultAmount / 10) : 0;
    const emeraldAmount = payoutMultiplier > 0 ? Math.floor(resultAmount / 5) : 0;
    const ironAmount = payoutMultiplier > 0 ? Math.floor(resultAmount / 7) : 0;
    const goldAmount = payoutMultiplier > 0 ? Math.floor(resultAmount / 6) : 0;
    const woodAmount = payoutMultiplier > 0 ? Math.floor(resultAmount / 8) : 0;
 
    if (diamondAmount > 0) {
      await client.rpg.add(`${M.sender}.diamond`, diamondAmount);
      text += `\n\n>>You also won ${diamondAmount} diamond(s).`;
    }
    
    if (ironAmount > 0) {
      await client.rpg.add(`${M.sender}.iron`, ironAmount);
      text += `\n\n>>You also won ${ironAmount} iron(s).`;
    }
    
    if (emeraldAmount > 0) {
      await client.rpg.add(`${M.sender}.emerald`, emeraldAmount);
      text += `\n\n>>You also won ${emeraldAmount} emerald(s).`;
    }

    if (woodAmount > 0) {
      await client.rpg.add(`${M.sender}.wood`, woodAmount);
      text += `\n\n>>You also won ${woodAmount} wood(s).`;
    }

    if (goldAmount > 0) {
      await client.rpg.add(`${M.sender}.gold`, goldAmount);
      text += `\n\n>>You also won ${goldAmount} golds(s).`;
    }
    
    M.reply(text);
  },
};
