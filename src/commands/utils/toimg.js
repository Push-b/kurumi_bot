module.exports = {
    name: 'toimg',
    aliases: ['img'],
    category: 'general',
    cool: 10,
    react: "✅",
    description: 'Converts sticker to image/gif',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        if (!M.quoted || (M.quoted && M.quoted.mtype !== 'stickerMessage'))
            return M.reply('*Quote the sticker that you want to convert*')
        const buffer = await M.quoted.download()
        const animated = M.quoted?.message?.stickerMessage?.isAnimated
        const type = animated ? 'video' : 'image'
        try {
            const result = animated ? await client.utils.webpToMp4(buffer) : await client.utils.webpToPng(buffer)
            await client.sendMessage(
                M.from,
                {
                    [type]: result,
                    gifPlayback: animated ? true : undefined
                },
                { quoted: M }
            )
        } catch (error) {
            client.log(error, 'red')
            return await M.reply('*Try Again*')
        }
    }
}
