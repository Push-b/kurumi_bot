const axios = require('axios')

module.exports = {
    name: 'quote',
    aliases: ['qu'],
    category: 'fun',
    cool: 5,
    react: "✅",
    description: 'Sends random quotes',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        await axios
            .get(`https://animechan.vercel.app/api/random`)
            .then((response) => {
                const text = `[${response.data.character}]: ${response.data.quote}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
