module.exports = {
    name: 'rule',
    aliases: ['rules'],
    category: 'general',
    react: "✅",
    description: 'Bot rules',
    async execute(client, arg, M) {

        let rules = `*Just dont abuse the bot or you will be banned*`
        M.reply(rules)

        
    }
}
