const thumbnailUrls = [
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}

const now = new Date();
const hour = now.getHours();
let greeting;
if (hour >= 0 && hour < 12) {
    greeting = "💕 Good Morning"; //good morning
} else if (hour >= 12 && hour < 18) {
    greeting = "💕 Good Afternoon"; //good afternoon
} else {
    greeting = "💕 Good Evening"; //good evening
}

module.exports = {
    name: 'help',
    aliases: ['h', 'menu', 'list'],
    category: 'general',
    exp: 10,
    react: "🏹",
    description: 'Displays the command list or specific command info',
    async execute(client, arg, M) {
        try {
            
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
        commands += `*━━━❰   ${client.utils.capitalize(
          category,
          true
          )}   ❱━━━*  \n\`\`\`☞${categories[category].map((cmd) => 
            `${cmd}`).join('⁠ , ')}\`\`\`\n\n`
        
        }

        // commands += `\n${emojis[commandList.indexOf(category)]} *${client.utils.capitalize(
        //   category,
        //   true
        //   )}*\n\n${categories[category].map((cmd) => `${client.prefix}${cmd}`).join(', ')}\`\`\`\n\n`
  
        
        let message = `*👋 Hello ${pushName} l'm ${process.env.NAME}. A whatsApp-Bot created by the NCT Association*\n\n💡 *Tips:➪ Warning: Dont use the bot in dm or you will be banned.* \n\n💡 *Tips:➪ Warning: Dont call the bot or you will be banned.*\n\n*╭⁠☞ Our Github*: github.com/NCT-Association\n\n 📝  *My commamd list*  📝: \n\n${commands}`
        message += `⛩️ *Thanks for using Archer. If you find me helpful, please share me with your friends and leave a review.* `
        const buffer = await client.utils.getBuffer('https://i.imgur.com/ZgrSw7W.jpg')
            
         // Retrieving detailed info about a specific command
         const command = client.cmd.get(arg) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(arg))
         if (!command) return M.reply('Command not found');
         message = `*CMD INFO*\n\n*🔴 Name:* ${command.name}\n*🟠 Aliases:* ${command.aliases.join(', ')}\n*𒉽 🟢:* ${command.description}`;

            await M.reply(message, 'text', undefined, undefined, undefined, [M.sender.jid], {
                title: client.utils.capitalize(`${client.config.name} Commands`),
                const thumbnailUrl = await.client.getRandomThumbnailUrl();
                thumbnail: await client.utils.getBuffer(thumbnailUrl),
                mediaType: 1
            });
        } catch (err) {
            await client.sendMessage(M.from, { image: { url: `${client.utils.errorChan()}` }, caption: `${greeting} Error Vonstrucker\n\nError:\n${err}` });
        }
    }
};
