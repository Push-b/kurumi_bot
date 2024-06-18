const yts = require('yt-search');
const YT = require('../../lib/YT');

module.exports = {
    name: 'ytsearch',
    aliases: ['yts'],
    category: 'media',
    react: "✅",
    usage: 'Use :ytsearch <query>',
    description: 'Searches for videos on YouTube based on the given query',
    async execute(client, arg, M) {
        try {
            if (!arg) return M.reply('Sorry, you did not provide any search term!');
            
            const { videos } = await yts(arg.trim());
            
            if (!videos || !videos.length) return M.reply(`No videos found for *"${arg.trim()}"*`);
            
            let text = '';
            const maxResults = 10;
            const length = Math.min(videos.length, maxResults);

            for (let i = 0; i < length; i++) {
                const video = videos[i];
                text += `*#${i + 1}*\n📗 *Title:* ${video.title}\n📕 *Channel:* ${video.author.name}\n📙 *Duration:* ${video.seconds}s\n🔗 *URL:* ${video.url}\n\n`;
            }

            M.reply(text);
        } catch (error) {
            console.error(error);
            M.reply('An error occurred while searching for videos.');
        }
    }
};
