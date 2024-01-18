module.exports = {
    name: 'delete',
    aliases: ['del'],
    category: 'general',
    react: "✅",
    description: 'Deletes the quoted message',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        
        if (!M.quoted) return M.reply('Quote the message that you want me to delete.')
        await client.sendMessage(M.from, {
            delete: M.quoted.key
        })
    }
}
