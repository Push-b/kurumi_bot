module.exports = {
    name: 'reset',
    category: 'dev',
    exp: 5,
    cool: 10,
    react: "💸",
    description: 'Declares bankruptcy and resets your bank account',
    async execute(client, arg, M) {

const thumbnailUrls = [
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
 const thumbnailUrl = getRandomThumbnailUrl(); 
    const mention = M.mentions[0]
   const sender = M.sender
    if (!M.mentions.length) return M.reply('*You must mention a user profile to continue*')
     await client.cradit.delete(`${M.mentions[0]}.wallet`) || 0
      await client.cradit.delete(`${M.mentions[0]}.bank`) || 0
       await client.sendMessage(
          M.from, {
          text: `successfuly reset account to 0 dollars and 0 cradits`,
         contextInfo: {
         externalAdReply: {
         tittle: 'Wallet', 
         body: '',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1
            }
         }
      })
    }
  }
