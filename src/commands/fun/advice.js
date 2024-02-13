const axios = require('axios')

module.exports = {
    name: 'advice',
    aliases: ['adv'],
    category: 'fun',
    cool: 10,
    react: "✅",
    description: 'Sends random advices',
    async execute(client, arg, M) {

     const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
    await axios
        
     .get(`https://api.adviceslip.com/advice`)
        
     .then((response) => {

      await client.sendMessage(
          M.from, {
          text: `🧘 *Advice for you:* ${response.data.slip.advice}`,
         contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: 'A D V I C E',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }  
