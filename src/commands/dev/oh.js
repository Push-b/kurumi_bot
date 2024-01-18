module.exports = {
    name: 'oh',
    aliases: ['ok,de,o,k'],
    react: "✅",
    category: 'dev',
    description: 'Removes the taged user',
    async execute(client, arg, M) {
        if (!M.mentions.length) return M.reply('🟥 Sir please tag the person!')
        await client.groupParticipantsUpdate(M.from, M.mentions, 'remove').then((res) => {
            M.reply(`✅ *Done removing Sir*`)
        })
    }
}
