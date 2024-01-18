const { getStats } = require('../../lib/stats')
const cx = require('canvacord')

module.exports = {
    name: 'rank',
    aliases: ['rk'],
    category: 'misc',
    react: "✅",
    description: 'Gives you your rank',
    async execute(client, arg, M) {

     const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const user = M.quoted?.participant ? M.quoted.participant : M.mentions[0] ? M.mentions[0] : M.sender

        let pfp
        try {
            pfp = await client.profilePictureUrl(user, 'image')
        } catch {
            pfp =
                'https://w0.peakpx.com/wallpaper/346/996/HD-wallpaper-love-live-sunshine-404-error-love-live-sunshine-anime-girl-anime.jpg'
        }

        const level = (await client.DB.get(`${user}_LEVEL`)) || 1
        const { requiredXpToLevelUp, rank } = getStats(level)
        const username = (await client.contact.getContact(user, client)).username
        const experience = (await client.exp.get(user)) || 0

        const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
        const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
        const randomHexz = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`

        const card = await new cx.Rank()
            .setAvatar(pfp)
            .setLevel(level)
            .setCurrentXP(experience, '#db190b')
            .setRequiredXP(requiredXpToLevelUp, '#db190b')
            .setProgressBar('#db190b')
            .setDiscriminator(user.substring(3, 7), '#db190b')
            .setCustomStatusColor('#db190b')
            .setLevelColor(randomHexs, randomHex)
            .setOverlay('', '', false)
            .setUsername(username, '#db190b')
            .setBackground('COLOR', randomHexz)
            .setRank(1, '', false)
            .renderEmojis(true)
            .build()

            // .setAvatar(pfp)
            // .setLevel(level)
            // .setLevelColor(randomHexs, randomHex)
            // .setCurrentXP(experience)
            // .setOverlay(randomHex, 100, false)
            // .setRequiredXP(requiredXpToLevelUp)
            // .setProgressBar(randomHexs, 'COLOR')
            // .setRank(0, rank, false)
            // .setBackground('COLOR', randomHexz)
            // .setUsername(username)
            // .setDiscriminator(user.substring(3, 7))
            // .build()
        //user.substring(3, 7)
        client.sendMessage(
            M.from,
            {
                image: card,
                caption: `@${user.split("@")[0]}#${user.substring(3, 7)}\`s rank card\n\n*🎯Exp:* ${experience}/${requiredXpToLevelUp}\n*❤️Level:* ${level}\n*🔮Role:* ${rank}`,
                mentions: [user]
            },
            {
                quoted: M
            }
        )
    }
}
//M.quoted.mtype === 'imageMessage',
