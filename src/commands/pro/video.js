const YT = require('../../lib/YT')
const yts = require("youtube-yts");

module.exports = {
    name: 'video',
    aliases: ['video'],
    category: 'proUsers',
    description: 'Downloads given YT Video',
    react: "✅",
    async execute(client, arg, M) {
          const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const link = async (term) => {
            const { videos } = await yts(term.trim())
            if (!videos || !videos.length) return null
            return videos[0].url
        }
        if (!arg) return M.reply('Please use this command with a valid youtube.com link')
        const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/
        const term = validPathDomains.test(arg) ? arg.trim() : await link(arg)
        if (!term) return M.reply('Please use this command with a valid youtube content link')
        if (!YT.validateURL(term.trim())) return M.reply('Please use this command with a valid youtube.com link')
        const { videoDetails } = await YT.getInfo(term)
        M.reply('*🎧...downloading...🎧*')
        let text = `*Title:* ${videoDetails.title} | *Type:* Video | *From:* ${videoDetails.ownerChannelName}`
        client.sendMessage(
            M.from,
            {
                image: {
                    url: `https://i.ytimg.com/vi/${videoDetails.videoId}/maxresdefault.jpg`
                },
                caption: text
            },
            {
                quoted: M
            }
        )
        if (Number(videoDetails.lengthSeconds) > 1800) return M.reply('Cannot download video longer than 30 minutes')
        const audio = YT.getBuffer(term, 'video')
            .then(async (res) => {
                await client.sendMessage(
                    M.from,
                    {
                        document: res,
                        mimetype: 'video/mp4',
                        fileName: videoDetails.title + '.mp4'
                    },
                    {
                        quoted: M
                    }
                )
            })
            .catch((err) => {
                return M.reply(err.toString())
            })
    }
}
//M.quoted.mtype === 'imageMessage',
