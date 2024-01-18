const { Sticker, StickerTypes } = require('wa-sticker-formatter')

module.exports = {
    name: 'sticker',
    aliases: ['s'],
    category: 'utils',
    react: "✅",
    description: 'sticker [caption/quote message containing media] <pack> | <author>',
    async execute(client, arg, M) {
        
   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const content = JSON.stringify(M.quoted)
        const isMedia = M.type === 'imageMessage' || M.type === 'videoMessage'
        const isQuoted =
            (M.type === 'extendedTextMessage' && content.includes('imageMessage')) ||
            (M.type === 'extendedTextMessage' && content.includes('videoMessage'))

        if (isMedia || isQuoted) {
            const pack = arg.split('|')
            const buffer = isQuoted ? await M.quoted.download() : await M.download()
            const sticker = new Sticker(buffer, {
                pack: pack[0] ? pack[0].trim() : '🥵 Stress_Giver',
                author: pack[1] ? pack[1].trim() : `Deryl 💚`,
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                quality: 70
            })

            await client.sendMessage(
                M.from,
                {
                    sticker: await sticker.build()
                },
                {
                    quoted: M
                }
            )
        } else return M.reply('Please quote or caption the image/video')
    }
}
