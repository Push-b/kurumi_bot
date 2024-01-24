module.exports = {
    name: 'reset',
    category: 'dev',
    exp: 5,
    cool: 10,
    react: "💸",
    description: 'Declares bankruptcy and resets your bank account',
    async execute(client, arg, M) {
    const mention = M.mentions[0]
   const sender = M.sender
    if (!M.mentions.length) return M.reply('*You must mention a user profile to continue*')
     await client.cradit.delete(`${M.sender}.wallet`) || 0
      await client.cradit.delete(`${M.sender}.bank`) || 0
      M.reply('successfuly reset account to 0 dollars.')
      }
   }
