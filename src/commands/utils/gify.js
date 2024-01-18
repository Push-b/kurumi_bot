const axios = require('axios')

module.exports = {
    name: 'getgif',
    aliases: ['gify'],
    category: 'utils',
    cool:10,
    react: "✅",
    description: 'Searches gif',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        if (!arg) return M.reply('Sorry you did not give any search term!')
        const res = await axios.get(`https://g.tenor.com/v1/search?q=${arg}&key=LIVDSRZULELA&limit=8`).catch(() => null)
        if (!res.data) return M.reply('Could not find')
        client.sendMessage(
            M.from,
            {
                video: {
                    url: res.data.results?.[Math.floor(Math.random() * res.data.results.length)]?.media[0]?.mp4?.url
                },
                caption: 'For you by Deryl',
                gifPlayback: true
            },
            {
                quoted: M
            }
        )
    }
}
