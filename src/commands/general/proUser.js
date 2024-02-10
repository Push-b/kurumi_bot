module.exports = {

  name: 'pro',

  aliases: ['pro'],

  category: 'general',
  
//  cool: 4,

  react: "✅",

  description: 'Get information bot information',

  async execute(client, arg, M) {

  let proUser = client.proUser

  for(let i=0;i<proUser.length;i++){
         
  let hmm = proUser[i]
         
 const um= (await client.contact.getContact(hmm, client)).username;
         
  await client.sendMessage(
          M.from, {
          text:`>>>${i+1}\n*Contact:* http://wa.me/+${proUser[i]}`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: 'P R O   U S E R',
        thumbnail: await client.utils.getBuffer('https://telegra.ph/file/505307775b32d70bb432e.jpg'),
        mediaType: 1
            }
         }
      })
    }
  }
}
