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
    'https://telegra.ph/file/e8a83694a1884505bc6a2.jpg',
    'https://telegra.ph/file/874e9f4c743c7081294c4.jpg',
    'https://telegra.ph/file/c6cb6c95679faf56e014c.jpg',
    'https://telegra.ph/file/00cdb5f54623e1b1f3de4.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
  const thumbnailUrl = getRandomThumbnailUrl(); 
  const tokens = await client.media.get(M.sender)
  if (!tokens) return M.reply('You dont have any media tokens')
  for (const [key, value] of Object.entries(tokens)) {
  await client.sendMessage(
          M.from, {
          text: `*➜  ${key}:* ${typeof value == 'number' ? value : '\n\n' + objToString(value)}`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: '🏖️  T   O   K   E   N   S   🏖️',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
}
