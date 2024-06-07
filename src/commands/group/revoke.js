module.exports = {
    name: 'revoke',
    aliases: ['reset'],
    react: "✅",
    category: 'group',
    description: 'Resets group link',
    async execute(client, arg, M) {
        
        await client.groupRevokeInvite(M.from).then((res) => {
            M.reply(`✅ *Done! Group link has been reset*`)
        })
    }
}
