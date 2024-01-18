const TD = require('better-tord')

module.exports = {
    name: 'truth_dare',
    aliases: ['td'],
    category: 'fun',
    cool: 8,
    react: "✅",
    description: 'Gives you tuth and dare',
    async execute(client, arg, M) {

const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

        if (!arg) return M.reply('Sorry you did not give any search term! e.g use *${client.prefix}truth_dare truth*')
        const Available = ['truth', 'dare']
        if (!Available.includes(arg.trim()))
            return M.reply(`Please provide a valid terms\n\n*Available:* \n${Available.join('\n')}`)
        M.reply(arg == 'truth' ? await TD.get_truth() : await TD.get_dare())
    }
}
