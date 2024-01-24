module.exports = {
    name: 'bankrupt',
    category: 'economy',
    exp: 5,
    cool: 10,
    react: "💸",
    description: 'Declares bankruptcy and resets your bank account',
    async execute(client, arg, M) {
      
      await client.DB.delete(`${M.sender}.wallet`) || 0
      M.reply('You have declared bankruptcy. Your bank account has been reset to 0 dollars.')
      }
   }
