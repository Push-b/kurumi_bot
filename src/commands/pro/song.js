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

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
    const media = (await client.DB.get('media')) || []
    if (!media.includes(M.from)) return M.reply(` *🟥 Media is not enabled in current group ask mods to enable or join support group* `)
            
  const economy = (await client.DB.get('economy')) || []

   const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
        
    if ((cradits - 1000) < 0) return M.reply('🟥 *You need $1000 in your wallet to use this command. Type .daily to get ten thousand dollars*')
        
      await client.cradit.sub(`${M.sender}.wallet`, 1000)

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
        if (Number(videoDetails.lengthSeconds) > 1800) return M.reply('Cannot download audio longer than 30 minutes')
        const audio = YT.getBuffer(term, 'audio')
            .then(async (res) => {
 await client.sendMessage(M.from, { 
         document: res,
        fileName: videoDetails.title + '.mp3',
        mimetype: 'audio/mpeg',
       contextInfo:{
        externalAdReply:{
       Title: 'videoDetails.title',
       body: '🎧 < D O C U M E N T > 🎧',
      thumbnail:  await client.utils.getBuffer(`https://i.ytimg.com/vi/${videoDetails.videoId}/maxresdefault.jpg`),
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
