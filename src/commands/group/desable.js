module.exports = {
    name: 'disable',
    aliases: ['disable' ],
    react: "✅",
    category: 'group',
    description: 'Deactivate certain features on group-chats',
    async execute(client, arg, M) {
        
        const toggleableGroupActions = ['mod', 'events' ]
        if (!arg)
            return M.reply(
                `Please provide a valid toggleable GroupActions\n\n*Available:* \n${toggleableGroupActions.join('\n')}`
            )
        if (!toggleableGroupActions.includes(arg.trim()))
            return M.reply(
                `Please provide a valid toggleable GroupActions\n\n*Available:* \n${toggleableGroupActions.join('\n')}`
            )
      
            const Actives = (await client.DB.get(arg)) || []
        if (!Actives.includes(M.from)) return M.reply(`🟥 ${client.utils.capitalize(arg)} is already in off your group`)
        await client.DB.pull(arg, M.from)
        M.reply(`✅ deactivating ${client.utils.capitalize(arg)} in your group`)
    }
}
