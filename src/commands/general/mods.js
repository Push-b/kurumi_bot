module.exports = {

  name: 'mods',

  aliases: ['mod'],

  category: 'general',
  
//  cool: 4,

  react: "✅",

  description: 'Get information bot information',

  async execute(client, arg, M) {

  let mods = client.mods

  let mo=`*❯──「 Archer Moderators 」──❮*\n\n`

  for(let i=0;i<mods.length;i++){
         
  let hmm = mods[i]
         
 const um= (await client.contact.getContact(hmm, client)).username;
         
  mo+=`\n#${i+1}\n*Name* @${mods.split('@')[0]}\n*Contact:* http://wa.me/+${mods[i]}\n`
   }
     M.reply(mo)
  }
}
