module.exports = {
    name: 'restart',
    aliases: ['relife'],
    category: 'dev',
    react: "✅",
    description: 'Restarts the bot',
    async execute(client, arg, M) {
        try{
            M.reply('*Restarting Archer please wait....*')
            await client.utils.restart()
        }catch(err){
            await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        }
    }
}
