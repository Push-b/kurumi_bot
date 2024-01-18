module.exports = {
    name: 'revoke',
    aliases: ['reset'],
    react: "✅",
    category: 'group',
    description: 'Resets group link',
    async execute(client, arg, M) {
        
    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        
        await client.groupRevokeInvite(M.from).then((res) => {
            M.reply(`✅ *Done! Group link has been reset*`)
        })
    }
}
