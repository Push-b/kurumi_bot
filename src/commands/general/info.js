const os = require('os')

module.exports = {
    name: 'info',
    aliases: ['info'],
    category: 'general',
    react: "✅",
    description: 'Get information bot information',
    async execute(client, arg, M) {

         const thumbnailUrls = [
    'https://telegra.ph/file/e57a9fe22877ee9f69ac7.jpg',
    'https://telegra.ph/file/eedb459ccf531467b5b9a.jpg',
    'https://telegra.ph/file/bbb5df0e235374328c473.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}
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
        const thumbnailUrl = getRandomThumbnailUrl()
        //client.contactDB
    await client.sendMessage(M.from, {
        text: `● ⏲️ *UPTIME:* ${uptime}\n● 🪩 *USERS:* ${Object.values(await client.contactDB.all()).length}\n● 🗃️ *COMMANDS:* ${client.cmd.size}\n● 📡 *Groups:* ${groupCount} \n● 🔮 *Nodejs:* ${process.version}\n● 🌀 *Memory:* ${ client.utils.formatSize(os.totalmem() - os.freemem()) + '/' + client.utils.formatSize(os.totalmem())}\n● 🌐 *Platform:* ${os.platform()}\n● 💻 *CPU:* ${cpus[0].model} ${cpus.length > 1 ? `(${cpus.length} core)` : ''}\n\n*「 By Deryl 」*`,
       contextInfo: {
         externalAdReply: {
        tittle: 'Uptime', 
         body: 'U  P  T  I  M  E',
        thumbnail: await client.utils.getBuffer(thumbnailUrl),
        mediaType: 1                        
                    }
                }
            }
        );
    }
};
