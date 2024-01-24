module.exports = {
    name: 'bankrupt',
    category: 'economy',
    exp: 5,
    cool: 10,
    react: "💸",
    description: 'Declares bankruptcy and resets your bank account',
    async execute(client, arg, M) {

      if (!arg) {
        return await M.reply('Are you sure you want to declare bankruptcy? This will reset your bank account. Type `-yes` to confirm.')
      }
      
      if (arg.startsWith('-yes') || arg.startsWith('-yes')) {
      await client.DB.delete(`${M.sender}.wallet`) || 0
      M.reply('You have declared bankruptcy. Your bank account has been reset to 0 coins.')
      } else {
        M.reply('Cancelled bankruptcy declaration')
      }
      
  }
}
