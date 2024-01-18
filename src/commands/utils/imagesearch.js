const google = require('googlethis')

module.exports = {
    name: 'imagesearch',
    aliases: ['imgs'],
    category: 'utils',
    cool: 10,
    react: "✅",
    description: 'Searches image from google.com',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        if (!arg) return M.reply('Sorry you did not give any search term!')
        const nsfw = (await client.DB.get('nsfw')) || []
        const images = await google.image(arg, { safe: nsfw.includes(M.from) }).catch((err) => {
            return M.reply('Could not find the searched term')
        })
        client.sendMessage(M.from, {
            image: {
                url: images[0].url
            },
            caption: 'Foy you by Deryl'
        })
    }
}
