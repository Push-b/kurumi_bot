const axios = require('axios')

module.exports = {
    name: 'neko',
    aliases: ['catgirl'],
    category: 'weeb',
    cool: 10,
    react: "✅",
    description: 'Sends an image of random neko',
    async execute(client, arg, M) {
        
   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const res = await axios.get(`https://api.waifu.pics/sfw/neko`).catch((err) => {
            return M.reply(err.toString())
            client.log(err, 'red')
        })
        client.sendMessage(M.from, {
            image: {
                url: res.data.url
            },
            caption: `_Neko Neko Ni~_`
        },
        {
            quoted: M
        })
    }
}
