const objToString = (obj) => {
    let str = ''
    for (const p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str += p + ':' + obj[p] + '\n'
        }
    }
    return str
}

module.exports = {
    name: 'inventory',
    aliases: ['invt'],
    category: 'rpg',
    exp: 7,
    react: "✅",
    description: 'Gives you details about your inventory',
    async execute(client, arg, M) {
     const rpg = (await client.DB.get('rpg')) || []
   if (!rpg.includes(M.from)) return M.reply(` *🟥 rpg is not enabled in current group ask mods to activate* `)

  const thumbnailUrls = [
    'https://telegra.ph/file/a0210abcd2451da334fca.jpg',
    'https://telegra.ph/file/2392a86e06ae7ff992961.jpg',
    'https://telegra.ph/file/c36b704c038623ec5a21d.jpg',
    'https://telegra.ph/file/8a1c35f16bb06c210b8da.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
  const thumbnailUrl = getRandomThumbnailUrl(); 
  const invemtory = await client.rpg.get(M.sender)
  if (!invemtory) return M.reply('You have no inventory')
  for (const [key, value] of Object.entries(invemtory)) {
  await client.sendMessage(
          M.from, {
          text: `*━━━❰🌀YOUR_INVENTORY🌀❱━━━*\n\n>>> *${key}:* ${typeof value == 'number' ? value : '\n\n' + objToString(value)}`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: 'M   I   N   E   R   A   L   S',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
}
