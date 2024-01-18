module.exports = {
    name: 'removebg',
    aliases: ['rbg'],
    category: 'utils',
    cool: 10,
    react: "✅",
    description: 'Removes background from the image',
    async execute(client, arg, M) {
    
    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
       try{
        if (!client.bgAPI) return M.reply("You didn't provide an api key")
        const content = JSON.stringify(M.quoted)
        const isQuoted = M.type === 'extendedTextMessage' && content.includes('imageMessage')
        const isImage = isQuoted
            ? M.type === 'extendedTextMessage' && content.includes('imageMessage')
            : M.type === 'imageMessage'
        if (!isImage) return M.reply("You didn't provide an image")
        const buffer = isQuoted ? await M.quoted.download() : await M.download()
        const image = await client.utils.removeBG(buffer)

        await client.sendMessage(
            M.from,
            {
                image: image
            },
            {
                quoted: M
            }
        )
       }catch(err){
        await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n${err}`})
      }
    }
}
