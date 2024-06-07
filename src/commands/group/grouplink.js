module.exports = {
    name: 'grouplink',
    aliases: ['inv', 'gclink', 'grouplink'],
    react: "✅",
    category: 'group',
    description: 'Get the group link',
    async execute(client, arg, M) {
        
        const invitelink = (await client.DB.get('invitelink')) || []
        if (!invitelink.includes(M.from)) return M.reply(`*Invitelink is not registered on this group*`)
        const code = await client.groupInviteCode(M.from)
        M.reply('https://chat.whatsapp.com/' + code)
    }
}
