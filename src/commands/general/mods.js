module.exports = {

  name: 'mods',

  aliases: ['mod'],

  category: 'general',
  
//  cool: 4,

  react: "✅",

  description: 'Get information bot information',

  async execute(client, arg, M) {

  let mods = client.mods
     
  for(let i=0;i<mods.length;i++){
      
  let hmm = mods[i]

  await client.sendMessage(
          M.from, {
          text:`#${i+1}\n*Contact:* http://wa.me/+${mods[i]}`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: 'M  O  D  S',
        thumbnail: await client.utils.getBuffer('https://telegra.ph/file/c8864ae2997f1486f363b.jpg'),
        mediaType: 1
            }
         }
      })
    }
  }
}
