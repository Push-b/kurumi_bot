module.exports = {
    name: 'ban',
    react: "✅",
    category: 'dev',
    description: 'Bans the taged user',
    async execute(client, arg, M) {
        try{

            if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
            
            if (!M.mentions.length) return M.reply('🟥 *You must tag the user to ban him/her.*')
            
            const banned = (await client.DB.get('banned')) || []
            
            M.mentions.filter(async (user) =>
            !banned.includes(user)
            ? (await client.DB.push('banned', user)) &&
            (await client.sendMessage(
                M.from,
                { text: `*@${user.split('@')[0]}* is now banned from using commands`, mentions: [user] },
                { quoted: M }
                ))
                : await client.sendMessage(
                    M.from,
                    { text: `*@${user.split('@')[0]}* is already banned`, mentions: [user] },
                    { quoted: M }
                    )
                    )
                }catch(err){
                    await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
                }
            }
        }
