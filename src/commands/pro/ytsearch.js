const yts = require("youtube-yts");

module.exports = {
    name: 'search',
    aliases: ['search'],
    category: 'proUsers',
    description: 'Searches the video of the given query in YouTube',
    react: "✅",
    async execute(client, arg, M) {
        if (!arg) return M.reply('Sorry you did not give any search term!')
        const { videos } = await yts(arg.trim())
        if (!videos || !videos.length) return M.reply(`No videos found | *"${query}"*`)
        let text = ''
        const length = videos.length >= 10 ? 10 : videos.length
        for (let i = 0; i < length; i++) {
            text += `*#${i + 1}*\n📜 *Title: ${videos[i].title}*\n🎚️ *Channel: ${
                videos[i].author.name
            }*\n🎯 *Duration: ${videos[i].seconds}s*\n🔗 *URL: ${videos[i].url}*\n\n`
        }
        M.reply(text)
    }
}
