module.exports = {
    name: 'health',
    aliases: ['lifes'],
    category: 'rpg',
    exp: 5,
    react: "✅",
    description: 'Show health information',
    async execute(client, arg, M) {
     await client.sendMessage(
          M.from, {
          text: `*Your health is ❤️ ${(await client.rpg.get(`${M.sender}.health`)) || 100}*`),
          contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: '',
        thumbnail: await client.utils.getBuffer(''),
        mediaType: 1
            }
         }
      })
    }
  }
    
