const axios = require('axios')

module.exports = {
    name: 'repo',
    aliases: ['repo'],
    category: 'general',
    react: "✅",
    usage: '',
    description: 'Downloads given YouTube Video and sends it as Audio',
    async execute(client, arg, M) {

         const thumbnailUrls = [
   'https://telegra.ph/file/2c6987dc8fe7294d67b9c.jpg',
    'https://telegra.ph/file/d32c66fe476f7acf3370a.jpg',
    'https://telegra.ph/file/77fe6725241b79e73c3ea.jpg',
    'https://telegra.ph/file/7a71e4adb3de99ac6d2a2.jpg',
    'https://telegra.ph/file/f2ae666c7a3f408e76f66.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
  const thumbnailUrl = getRandomThumbnailUrl()

try {
                let repoInfo = await axios.get('https://api.github.com/repos/Push-b/kurumi_bot')
                if (!repoInfo) {
                    return M.reply('Failed to fetch repo information.');
                }
                let repo = repoInfo.data
                let txt = `🧣 *Kurumi Script* 🧣\n\n*🎀 Total Forks:* ${repo.forks}\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${repo.license.name}\n*📁 Repo Size:* ${(repo.size/1024).toFixed(2)} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${repo.html_url}\n\n❝ Dont forget to give a Star ⭐ to the repo.`
      
     await client.sendMessage(M.from, { image : { url : thumbnailUrl} , caption: txt , gifPlayback: true} , {quoted: M})
      }catch(err){
    await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
  }
          
    }
}
