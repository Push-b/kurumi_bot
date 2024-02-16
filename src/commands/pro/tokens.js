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
    name: 'tokens',
    aliases: ['tokens'],
    category: 'media',
    exp: 7,
    react: "✅",
    description: 'Gives you details about your inventory',
    async execute(client, arg, M) {

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
  const tokens = await client.rpg.get(M.sender)
  if (!tokens) return M.reply('You dont have any media tokens')
  for (const [key, value] of Object.entries(tokens)) {
  await client.sendMessage(
          M.from, {
          text: `*>>>  ${key}:* ${typeof value == 'number' ? value : '\n\n' + objToString(value)}`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: 'T   O   K   E   N   S',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
}
