module.exports = {

  name: 'mods',

  aliases: ['mod'],

  category: 'general',
  
//  cool: 4,

  react: "✅",

  description: 'Get information bot information',

  async execute(client, arg, M) {

  let mods = client.mods
    
    let number = '263788671478@s.whatsapp.net'

  let mo=`*❯──「 Archer Moderators 」──❮*\n\n`
     
  for(let i=0;i<mods.length;i++){
      
  let hmm = mods[i]

  mo+=`\n#${i+1}\n*Name:* @${mods.split('@')[0]}`
    
   }
      M.reply(mo)
  }
}
