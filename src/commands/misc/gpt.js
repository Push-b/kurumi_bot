module.exports = {
    name: 'gpt',
    aliases: ['g'],
    category: 'fun',
    exp: 5,
    react: "✅",
    description: 'Let you chat with GPT chat bot',
    async execute(client, arg, M) {
  
        const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        if (!process.env.openAi) return M.reply('You have not provided an OpenAI API key in the config file')
        
        let user = "263788671478@s.whatsapp.net"
        if(arg === 'who made you' || arg === 'who is your creator'
        || arg === 'who is your owner' || arg === 'who wrote your code'
        || arg === 'who write your code' || arg === 'name of your create'
        || arg === 'number of your creator'|| arg === 'no. of your creator'
        || arg === 'no of your creator' || arg === 'creator' || arg === 'owner'
        || arg === 'creator name' || arg === 'owner name'
        ){
            return await client.sendMessage(M.from , {text: `@${user.split("@")[0]} is my owner` , mentions: [user]} , {quoted: M})
        }

        

        let context= arg
        // const input = args.join(' ')
        if (context === null) return M.reply('Please provide some text to prompt the AI')
        try {

            let url = "https://preview.redd.it/chatgpt-chan-anime-girl-v0-8v59tdhy7hfa1.png?auto=webp&s=bc4e156e0a89ccbfaaac239c78e99e5aef9c5767"
            if(arg === 'hey' || arg === 'hey, how are you' ||
            arg === 'hey how are you' || arg === 'hey how are you gpt' ||
            arg === 'hey gpt' || arg === 'hey, how are you gpt'
            ){
                return await client.sendMessage(M.from , {image: {url: url} , caption: `Hey! ${(await client.contact.getContact(M.sender, client)).username} how can i help you today.`} , {quoted: M})
            }
            else{
                const response = await client.gpt.chat(context)

            let res = response.response;

            let text = `Q. ${context}\n\nA. ${res.trim().replace(/\n\n/, '\n')}`;

            // let text = `Q. ${context}\n\n${'A.'+res}`
            await M.reply(text)
            }

            
            // await this.client.sendMessage(m.from , {text: text} ,{quoted: m})
        
        } //Our beloved error chan. No one can stop her!
        catch(err){
          await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        }
    }
}
