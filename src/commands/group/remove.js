module.exports = {
    name: 'remove',
    aliases: ['rem'],
    react: "✅",
    category: 'group',
    description: 'Removes the taged user',
    async execute(client, arg, M) {
        
        if (!M.mentions.length) return M.reply('*You must tag the user for me to remove!*')
        await client.groupParticipantsUpdate(M.from, M.mentions, 'remove').then((res) => {
            M.reply(`✅ *Done! removing ${M.mentions.length} users*`)
        })
    }
}
