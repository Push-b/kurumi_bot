module.exports = {
  name: 'invest',
  category: 'economy',
  exp: 5,
  cool: 20,
  react: "✅",
  description: 'Invests yens for a specified duration and earns interest',
  async execute(client, arg, M) {
    if (!arg) return M.reply('Please provide the amount and duration');
    const regex = /^(\d+)\s+for\s+(\d+)\s*(min|minute|m|minutes)$/i;
    const match = arg.match(regex);
    if (!match) return M.reply('Invalid format. Please use: invest [amount] for [duration]');
    const parsedAmount = parseInt(match[1]);
    const parsedDuration = parseInt(match[2]);
    if (isNaN(parsedAmount) || isNaN(parsedDuration)) return M.reply('Please provide a valid amount and duration');
    if (parsedAmount <= 0 || parsedDuration <= 0) return M.reply('Please provide a positive amount and duration');
    if (parsedAmount > 200000) return M.reply('Maximum investment amount is 200000 yens');
    //  const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
        
    
    

    const earnings = calculateEarnings(parsedAmount, parsedDuration);
    const userId = M.sender;
     const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
    if (parsedAmount > cradits) return M.reply('You don\'t have enough yens in your wallet');
    if (!cradits) {
      const newEconomy = new client.econ({ userId });
      await newEconomy.save();
    }
     economy.wallet += -parsedAmount
     await economy.save()

    await M.reply(`You will reviece the invested amount shortly after ${parsedDuration}`)

    await new Promise(resolve => setTimeout(resolve, parsedDuration * 60 * 1000));
    economy.wallet += parsedAmount + earnings;
    await economy.save();
    M.reply(`You have successfully invested ${parsedAmount} yens for ${parsedDuration} minutes and earned ${earnings} yens!`);
  }
};

function calculateEarnings(amount, duration) {
  if (duration >= 2 || duration <= 2 ) {
    return Math.floor(amount * 0.02);
  } else if (duration <= 10) {
    return Math.floor(amount * 0.03);
  } else if (duration <= 30) {
    return Math.floor(amount * 0.05);
  } else if (duration <= 60) {
    return Math.floor(amount * 0.1);
  } else {
    return Math.floor(amount * 0.15);
  }
}
