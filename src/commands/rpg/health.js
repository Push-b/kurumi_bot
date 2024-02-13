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
          text: `*Your health is ❤️ ${(await client.rpg.get(`${M.sender}.health`)) || 100}*`,
          contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: '❤️ Y O U R  H E A L T H ❤️',
        thumbnail: await client.utils.getBuffer('https://telegra.ph/file/819c799305d543accdd2a.jpg'),
        mediaType: 1
            }
         }
      })
    }
  }
    
