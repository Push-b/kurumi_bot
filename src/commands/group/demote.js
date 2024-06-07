module.exports = {
    name: 'demote',
    aliases: ['demo'],
    react: "✅",
    category: 'group',
    description: 'Demotes the taged user',
    async execute(client, arg, M) {
        
        if (!M.mentions.length) return M.reply('🟥 *You must tag the user to demote broh!*')
        const groupMetadata = await client.groupMetadata(M.from)
        const groupMembers = groupMetadata?.participants || []
        const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
        let adminUsers = []
        // Filter the users who are admin and push the not admin users in the users var
        M.mentions.filter((users) => (groupAdmins.includes(users) ? adminUsers.push(users) : null))
        await client.groupParticipantsUpdate(M.from, adminUsers, 'demote').then((res) => {
            M.reply(`✅ Done! Demoting ${adminUsers.length} users`)
        })
    }
}
