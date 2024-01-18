module.exports = {
    name: 'eval',
    aliases: ['e'],
    category: 'dev',
    react: "✅",
    description: 'Evaluates JavaScript',
    async execute(client, arg, M) {
       try{
        if (!arg) return M.reply('🟥  *You didnt provided any term to eval!*')
        let out = ''
        try {
            const output = (await eval(arg)) || '✅ *Executed JS Successfully!*'
            out = JSON.stringify(output)
        } catch (err) {
            out = err.message
        }
        return await M.reply(out)
       }catch(err){
        await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
      }
    }
}
