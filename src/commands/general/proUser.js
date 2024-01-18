module.exports = {

  name: 'pro',

  aliases: ['pro'],

  category: 'general',
  
//  cool: 4,

  react: "✅",

  description: 'Get information bot information',

  async execute(client, arg, M) {

  let proUser = client.proUser

  let mo=`*❯──「 Pro-Users 」──❮*\n\n`

  for(let i=0;i<proUser.length;i++){
         
  let hmm = proUser[i]
         
 const um= (await client.contact.getContact(hmm, client)).username;
         
  mo+=`\n#${i+1}\n*Contact:* http://wa.me/+${proUser[i]}\n`
   }
     M.reply(mo)
  }
}
