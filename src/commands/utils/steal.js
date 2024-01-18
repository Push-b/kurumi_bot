const { Sticker, StickerTypes } = require('wa-sticker-formatter')

module.exports = {
    name: 'steal',
    aliases: ['take'],
    category: 'utils',
    react: "✅",
    description: 'steal [quote message containing sticker] <pack> | <author>',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        const content = JSON.stringify(M.quoted)
        const isQuotedSticker = M.type === 'extendedTextMessage' && content.includes('stickerMessage')

        if (isQuotedSticker) {
            const pack = arg.split('|')
            const buffer = await M.quoted.download()
            const sticker = new Sticker(buffer, {
                pack: pack[0] ? pack[0].trim() : '👾 Deryl',
                author: pack[1] ? pack[1].trim() : `Stress_Giver 👾`,
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
