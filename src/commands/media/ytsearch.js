const yts = require("youtube-yts");

module.exports = {
    name: 'ytsearch',
    aliases: ['yts'],
    category: 'media',
    description: 'Searches the video of the given query in YouTube',
    async execute(client, arg, M) {
     const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        
    const media = (await client.DB.get('media')) || []
    if (!media.includes(M.from)) return M.reply(`🟥 *Media is not enabled in current group ask mods to enable or join support group* `)
        if (!arg) return M.reply('🟥 *Sorry you did not give any search term!*')
        const { videos } = await yts(arg.trim())
        if (!videos || !videos.length) return M.reply(`No videos found | *"${query}"*`)
        let text = ''
        const length = videos.length >= 10 ? 10 : videos.length
        for (let i = 0; i < length; i++) {
            text += `*#${i + 1}*\n📗 *Title: ${videos[i].title}*\n📕 *Channel: ${
                videos[i].author.name
            }*\n📙 *Duration: ${videos[i].seconds}s*\n🔗 *URL: ${videos[i].url}*\n\n`
        }
        M.reply(text)
    }
}
