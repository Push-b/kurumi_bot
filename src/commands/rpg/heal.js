module.exports = {
    name: 'heal',
    category: 'rpg',
    exp: 7,
    cool: 5,
    react: "✅",
    description: 'Recharges your health upto 30%',
    async execute(client, arg, M) {
     const rpg = (await client.DB.get('rpg')) || []
   if (!rpg.includes(M.from)) return M.reply(` *🟥 rpg is not enabled in current group ask mods to activate* `)
        const health = await client.rpg.get(`${M.sender}.health`) || 100
        const heal_potion = await client.rpg.get(`${M.sender}.potion`)
        if (!heal_potion) return M.reply('You do not have any heal potions')
        if (health == 100) return M.reply('Your ❤️health is full! You do not need to heal!!')
        const health_inc = parseInt(health) + 30 > 100 ? 100 - health : parseInt(health) + 30
        await client.rpg.set(`${M.sender}.health`, health_inc)
        await client.rpg.sub(`${M.sender}.potion`, 1)
        return M.reply(`You healed ${health_inc}❤️hp!`)
    }
}
