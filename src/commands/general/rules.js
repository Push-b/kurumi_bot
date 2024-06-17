module.exports = {
    name: 'rule',
    aliases: ['rules'],
    category: 'general',
    react: "✅",
    description: 'Bot rules',
    async execute(client, arg, M) {

        const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

        let rules = `*Just dont abuse the bot or you will be banned*`
        M.reply(rules)

        
    }
}
