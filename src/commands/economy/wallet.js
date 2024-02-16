module.exports = {
    name: 'wallet',
    aliases: ['wal'],
    category: 'economy',
    react: "✅",
    description: 'Shows the wallet value',
    async execute(client, arg, M) {

  const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
    const economy = (await client.DB.get('economy')) || []
     if (!economy.includes(M.from)) return M.reply(` *❌ Type .support to get Casino group* `)

    const thumbnailUrls = [
    'https://telegra.ph/file/9cd2636c54369e9ce47b1.jpg',
    'https://telegra.ph/file/3fcf43fcbf902bd6ac8a5.jpg',
    'https://telegra.ph/file/2a1deaf350fd7aa2b45e4.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
 const thumbnailUrl = getRandomThumbnailUrl(); 
 let wallet = await client.cradit.get(`${M.sender}.wallet`) || 0;
     
 await client.sendMessage(
          M.from, {
          text: `👤 *Name:* ${(await client.contact.getContact(M.sender, client)).username}\n🔖 *Tag:* #${M.sender.substring(3, 7)}\n💵 *dollars:* ${wallet}`,
          contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: '👛  W  A  L  L  E  T  👛',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
