const os = require('os')

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
        const cpus = os.cpus()
        //client.contactDB
        M.reply(
         `\n⏲️ *UPTIME:* ${uptime}\n🪩 *USERS:* ${Object.values(await client.contactDB.all()).length}\n🗃️ *COMMANDS:* ${client.cmd.size}\n📡 *Groups:* ${groupCount} \n🔮 *Nodejs:* ${process.version}\n🌀 *Memory:* ${ client.utils.formatSize(os.totalmem() - os.freemem()) + '/' + client.utils.formatSize(os.totalmem())}\n💻 *CPU:* ${cpus[0].model} ${cpus.length > 1 ? `(${cpus.length} core)` : ''}\n🌐 *Platform:* ${os.platform()}\n\n
   º º º º「 By Deryl 」º º º º*`
         )
    }
}
