module.exports = {
    name: 'switch',
    aliases: ['promod'],
    react: "✅",
    category: 'dev',
    description: 'Promotes the taged user',

    async execute(client, arg, M) {

        const toggleableGroupActions = ['archer','economy','media','rpg','card-game']

        if (!arg)

            return M.reply(

                `Please provide a valid toggleable GroupActions\n\n*Available:* \n${toggleableGroupActions.join('\n')}`

            )

        if (!toggleableGroupActions.includes(arg.trim()))

            return M.reply(

                `🟥 *Please provide a valid toggleable GroupActions*\n\n*Available:* \n${toggleableGroupActions.join('\n')}`

            )

        const Actives = (await client.DB.get(arg)) || []

        if (Actives.includes(M.from))

            return M.reply(`✅ *${client.utils.capitalize(arg)} is already activate in your group*`)

        await client.DB.push(arg, M.from)

        M.reply(`✅ *Successfully Enabled ${client.utils.capitalize(arg)} in your group*`)

    }

}
