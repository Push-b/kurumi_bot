module.exports = {
    name: 'remove',
    aliases: ['rem'],
    react: "✅",
    category: 'group',
    description: 'Removes the taged user',
    async execute(client, arg, M) {

  const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        
        if (!M.mentions.length) return M.reply('🟥 *You must tag the user for me to remove!*')
        await client.groupParticipantsUpdate(M.from, M.mentions, 'remove').then((res) => {
            M.reply(`✅ *Done! removing ${M.mentions.length} users*`)
        })
    }
}
