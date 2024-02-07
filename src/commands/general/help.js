const thumbnailUrls = [
    'https://telegra.ph/file/06e3461fa541681343775.jpg',
    'https://telegra.ph/file/87d22519a8aa659f7d336.jpg',
    'https://telegra.ph/file/da2372a460574e693556d.jpg',
    'https://telegra.ph/file/b03c0e6b21bad30e73e70.jpg',
    'https://telegra.ph/file/f4625990885d707b7c795.jpg',
    'https://telegra.ph/file/6bc8c1a8c6a9a3bb4d156.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}

module.exports = {
name: 'help',
aliases: ['h', 'menu', 'list'],
category: 'general',
cool: 20,
react: "✅",
description: 'Displays the command list or specific command info',
async execute(client, arg, M) {
const archer = (await client.DB.get('archer')) || []
if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

  try{

    if (!arg) {
    
      let pushName = M.pushName.trim();
  
      if (pushName.split(' ').length === 1) {
        pushName = `${pushName} .`;
      }
      
      const categories = client.cmd.reduce((obj, cmd) => {
        const category = cmd.category || 'Uncategorized'
        obj[category] = obj[category] || []
        obj[category].push(cmd.name)
        return obj
      }, {})
      
      const commandList = Object.keys(categories)
      
      let commands = ''
      
      for (const category of commandList) {
        commands += `*━━━━❰ ${client.utils.capitalize(
          category,
          true
          )}  ❱━━━━*  \n\`\`\`${categories[category].map((cmd) => 
            `${cmd}`).join(' ⁠••• ')}\`\`\`\n\n`
        
        }

        // commands += `\n${emojis[commandList.indexOf(category)]} *${client.utils.capitalize(
        //   category,
        //   true
        //   )}*\n\n${categories[category].map((cmd) => `${client.prefix}${cmd}`).join(', ')}\`\`\`\n\n`
  
        
        let message = `*✌️ wassup! ${pushName} l am ${process.env.NAME}, a whatsApp-Bot created by NCT-Association*\n\n>>> This help menu is designed to help you get started with the Bot* \n\n${commands}`
        message += `📡 *Thanks for using Archer. If you find me helpful, please share me with your friends and leave a review* ⭐ `
         
        await M.reply(message, 'text', undefined, undefined, undefined, [M.sender.jid], {
                title: client.utils.capitalize(`${client.config.name} Commands`),
                thumbnail: await client.utils.getBuffer(thumbnailUrl),
                mediaType: 1
            });
       
         const command = client.cmd.get(arg) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(arg));
        
        if (!command) {
          return M.reply('Command not found');
        }

        const aliases = command.aliases ? command.aliases.join(', ') : 'No Aliases';
        const cooldown = command.cool ? command.cool : 'No cooldown';
        const description = command.description ? command.description : 'No Description'

        const message = `🟥 Command: ${command.name}\n⬜ Aliases: ${aliases}\n🟧 Category: ${command.category}\🟩 Cooldown: ${cooldown}\n🟪 Desc: ${description}`;

        M.reply(message);

  }catch(err){
    await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
  }
          
    }
      }
              
