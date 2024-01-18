const axios = require('axios')

module.exports = {
    name: 'fact',
    category: 'fun',
    cool: 10,
    react: "✅",
    description: 'Sends random facts',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        await axios
            .get(`https://nekos.life/api/v2/fact`)
            .then((response) => {
                const text = `🌀 *Fact for you:* ${response.data.fact}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
