module.exports = {
    name: 'deposit',
    aliases: ['dt'],
    category: 'economy',
    react: "✅",
    description: 'Deposits golds in your bank',
    async execute(client, arg, M) {

  const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
    const economy = (await client.DB.get('economy')) || []
     if (!economy.includes(M.from)) return M.reply(` *❌ Type .support to get Casino group* `)

     const thumbnailUrls = [
    'https://telegra.ph/file/0ba278843b95f6ad9d4ec.jpg',
    'https://telegra.ph/file/fdf7042ca9594403dd760.jpg',
    'https://telegra.ph/file/aab1139a3b8369fe37810.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
 const thumbnailUrl = getRandomThumbnailUrl(); 
 if (!arg) return M.reply('Please provide the amount')
 const amount = parseInt(arg)
 if (isNaN(amount)) return M.reply('Please provide the amount')
 if (arg.startsWith('-') || arg.startsWith('+')) return M.reply('Please provide the amount')
const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
 if ((cradits - parseInt(amount)) < 0) return M.reply('You dont have that much in your wallet')
 await client.cradit.add(`${M.sender}.bank`, amount)
 await client.cradit.sub(`${M.sender}.wallet`, amount)
 await client.sendMessage(
          M.from, {
          text:`>>> successfully deposited 💵${amount} in your bank`,
         contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: '🏛️  B   A   C   L   A   Y   S   🏛️',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
