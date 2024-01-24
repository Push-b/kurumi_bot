const axios = require('axios')

module.exports = {
    name: 'waifu',
    aliases: ['animegirl'],
    category: 'utils',
    cool: 10,
    react: "✅",
    description: 'Sends an image of a random waifu',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const res = await axios.get(`https://api.waifu.im/search/?included_tags=waifu`).catch((err) => {
            return M.reply(err.toString())
            client.log(err, 'red')
        })

        client.sendMessage(M.from, {
            image: {
                url: res.data.images[0].url
            },
            caption: `Waifu from ${res.data.images[0].source}`
        },
        {
            quoted: M
        }
        )
    }
}
