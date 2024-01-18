module.exports = {
    name: 'deact',
    aliases: ['deact'],
    react: "✅",
    category: 'dev',
    description: 'Deactivate certain features on group-chats',
    async execute(client, arg, M) {
        const toggleableGroupActions = ['media', 'economy', 'archer','naughty','card-game']
        if (!arg)
            return M.reply(
                `Please provide a valid toggleable GroupActions\n\n*Available:* \n${toggleableGroupActions.join('\n')}`
            )
        if (!toggleableGroupActions.includes(arg.trim()))
            return M.reply(
                `Please provide a valid toggleable GroupActions\n\n*Available:* \n${toggleableGroupActions.join('\n')}`
            )
      
            const Actives = (await client.DB.get(arg)) || []
        if (!Actives.includes(M.from)) return M.reply(`🟥 *${client.utils.capitalize(arg)} is already in off your group*`)
        await client.DB.pull(arg, M.from)
        M.reply(`✅ *Successfully deactivated ${client.utils.capitalize(arg)} in your group*`)
    }
}
