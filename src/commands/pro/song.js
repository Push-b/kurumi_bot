const YT = require('../../lib/YT')
// const yts = require('yt-search')
const yts = require("youtube-yts");

module.exports = {
    name: 'play',
    aliases: ['play','song'],
    category: 'media',
    description: 'Downloads given YT Video and sends it as Audio',
    react: "✅",
    async execute(client, arg, M) {
        const link = async (term) => {
            const { videos } = await yts(term.trim())
            if (!videos || !videos.length) return null
            return videos[0].url
        }
        if (!arg) return M.reply('🟥 *No such command found*')
        const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/
        const term = validPathDomains.test(arg) ? arg.trim() : await link(arg)
        if (!term) return M.reply('🟥 *Please use this command with a valid youtube contant link*')
        if (!YT.validateURL(term.trim())) return M.reply('🟥 *Please use this command with a valid youtube.com link*')
        const { videoDetails } = await YT.getInfo(term)
       const musictoken = await client.media.get(`${M.sender}.musictoken`)
     if (!musictoken) return M.reply(`🟥 You dont have any music token visit the .media-shop and buy music tokens!`)
     await client.media.sub(`${M.sender}.musictoken`, 1)
         M.reply(videoDetails.title + '.mp3')
        if (Number(videoDetails.lengthSeconds) > 1800) return M.reply('Cannot download audio longer than 30 minutes')
        const audio = YT.getBuffer(term, 'audio')
            .then(async (res) => {
 await client.sendMessage(M.from, { 
         document: res,
        fileName: videoDetails.title + '.mp3',
        mimetype: 'audio/mpeg',
       contextInfo:{
        externalAdReply:{
       Title: videoDetails.ownerChannelName,
       body: videoDetails.ownerChannelName,
      thumbnail: await client.utils.getBuffer(`https://i.ytimg.com/vi/${videoDetails.videoId}/maxresdefault.jpg`),
      mediaUrl: videoDetails.ownerChannelName,
      mediaType:2,
          }
       }
    })
  })

 .catch((err) => {
return M.reply(err.toString())
client.log(err, 'red')
            })
    }
}
//M.quoted.mtype === 'imageMessage',
