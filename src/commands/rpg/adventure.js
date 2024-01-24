const ms = require('parse-ms')
const percentageCal = (partialValue, totalValue) => {
    const percentage = (100 * partialValue) / totalValue
    return Math.round(percentage)
}
const reward = (level) => {
    return {
        reward: {
            trash: Math.round(Math.random() * 5) * level,
            potion: Math.round(Math.random() * 2) * level,
            armor: Math.round(Math.random() * 3) * level,
            sword: Math.round(Math.random() * 5) * level,
            wood: Math.round(Math.random() * 8) * level,
            string: Math.round(Math.random() * 8) * level,
            iron: Math.round(Math.random() * 5) * level,
            gold: Math.round(Math.random() * 3) * level,
            diamond: Math.round(Math.random() * 2) * level
        }
    }
}

module.exports = {
    name: 'adventure',
    aliases: ['advn'],
    category: 'rpg',
    react: "✅",
    exp: 8,
    description: 'RPG games for adventure',
    async execute(client, arg, M) {
    const rpg = (await client.DB.get('rpg')) || []
   if (!rpg.includes(M.from)) return M.reply(` *🟥 rpg is not enabled in current group ask mods to activate* `)
        const cooldown = 300000
        const lastadvn = await client.DB.get(`${M.sender}.adventure`)
        if (lastadvn !== null && cooldown - (Date.now() - lastadvn) > 0) {
            const lastadvntime = ms(cooldown - (Date.now() - lastadvn))
            return M.reply(
                `*You have to wait ${lastadvntime.minutes} minute(s), ${lastadvntime.seconds} second(s) for another hunt*`
            )
        }
        const level = await client.DB.get(`${M.sender}_LEVEL`) || 1
        const health = await client.rpg.get(`${M.sender}.health`) || 100
        const armor = await client.rpg.get(`${M.sender}.armor`)
        const sword = await client.rpg.get(`${M.sender}.sword`)
        if (!armor) return M.reply(`*You dont have any armor!!*`)
        if (!sword) return M.reply(`*You dont have a sword!!*`)
        if (health < 30) return M.reply(`*You dont have the required health ❤️*`)
        await client.DB.set(`${M.sender}.adventure`, Date.now())
        M.reply(
            `*You have _Health: ${percentageCal(10, health)}_ ❤️ reduction and your armor and sword got ${percentageCal(
                30,
                armor
            )}, ${percentageCal(5, sword)} respectively damage*`
        )
        await client.rpg.sub(`${M.sender}.armor`, percentageCal(40, armor))
        await client.rpg.set(`${M.sender}.health`, health - percentageCal(30, health))
        await client.rpg.sub(`${M.sender}.sword`, percentageCal(10, sword))
        let text = '🔖 *Your Adventure Reward:*\n\n'
        for (const rewardItem in reward(level).reward) {
            await client.rpg.add(`${M.sender}[${rewardItem}]`, reward(level).reward[rewardItem])
            text += `*>>> ${rewardItem}: _${reward(level).reward[rewardItem]}_*\n`
        }
        setTimeout(() => {
            M.reply(text)
        }, 10000)
    }
}
