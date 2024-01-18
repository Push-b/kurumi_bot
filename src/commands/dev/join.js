module.exports = {
    name: 'join',
    aliases: ['add'],
    category: 'dev',
    cool: 20,
    react: "✅",
    description: 'Bot joins the group using the link',
    async execute(client, arg, M) {
       try{

        if (!arg) return M.reply('🟥 *Sorry you did not provide any group link!*')
        if (!arg.includes('whatsapp.com')) return M.reply('🟥 *Sorry you did not give any valid group link*!')
        const JoinCode = arg.split('https://chat.whatsapp.com/')[1]
        client
            .groupAcceptInvite(JoinCode)
            .then((res) => M.reply('✅ *Joined sir*'))
            .catch((res) => M.reply('🟥 *Something went wrong please check the link*'))

       }catch(err){
      await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
    }
    }
}
