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
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
   
   let wallet = await client.cradit.get(`${M.sender}.wallet`) || 0;

    const thumbnailUrl = getRandomThumbnailUrl();
   
        let text = `👝 *Wallet* 👝\n\n👤 *Name:* ${(await client.contact.getContact(M.sender, client)).username}\n🔖 *Tag:* #${M.sender.substring(3, 7)}\n💵 *dollars:* ${wallet}\n`
         await client.sendMessage(
          M.from,
         {
          externalAdReply: {
          tittle: `Wallet`,
          thumbnail: await client.utils.getBuffer (thumbnailUrl),
          mediaType: 1,
         ShowAdAttribution: true
       })
    }
}
