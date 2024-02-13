module.exports = {
    name: 'info',
    aliases: ['info'],
    category: 'general',
    cool: 20,
    react: "✅",
    description: 'Get information bot information',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
    
        
        const getGroups = await client.groupFetchAllParticipating()
        const groups = Object.entries(getGroups)
        .slice(0)
        .map((entry) => entry[1])
        const groupCount = groups.length
        const pad = (s) => (s < 10 ? '0' : '') + s
        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / (60 * 60))
            const minutes = Math.floor((seconds % (60 * 60)) / 60)
            const secs = Math.floor(seconds % 60)
            return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
            
        }
           const uptime = formatTime(process.uptime())
        //client.contactDB
        await client.sendMessage(
          M.from, {
          text: `🔋 UPTIME:* ${uptime}\n📡 Groups:* ${groupCount}\n🧸 USERS:* ${Object.values(await client.contactDB.all()).length}\n🗂️ COMMANDS:* ${client.cmd.size}\n🌀 Nodejs:* ${process.version},
         contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: 'I N F O R M A T I O N ',
        thumbnail: await client.utils.getBuffer('https://telegra.ph/file/505307775b32d70bb432e.jpg'),
        mediaType: 1
            }
          }
       })
      }
    }
  }
 }
