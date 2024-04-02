module.exports = {
    name: 'enable',
    aliases: ['act'],
    react: "✅",
    category: 'group',
    description: 'Activate certain features on group-chats',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        
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
        if (Actives.includes(M.from))
            return M.reply(`${client.utils.capitalize(arg)} is already activate in your group`)
        await client.DB.push(arg, M.from)
        M.reply(`✅ Successfully activating ${client.utils.capitalize(arg)} in your group`)
    }
}
