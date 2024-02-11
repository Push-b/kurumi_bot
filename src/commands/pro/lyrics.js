module.exports = {
    name: 'lyrics',
    category: 'media',
    description: 'Sends the lyrics of a given song',
    react: "✅",
        async execute(client, arg, M) {
  const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
    const media = (await client.DB.get('media')) || []
    if (!media.includes(M.from)) return M.reply(` *🟥 Media is not enabled in current group ask mods to enable or join support group* `)
            
  const economy = (await client.DB.get('economy')) || []

   const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
        
    if ((cradits - 200) < 0) return M.reply('🟥 *You need $200 in your wallet to use this command. Type .daily to get ten thousand dollars*')
        
      await client.cradit.sub(`${M.sender}.wallet`, 200)
            
        if (!arg) return void M.reply('🟥 *Provide the name of the song to search the lyrics*')
        const term = arg.trim()
        const data = await client.utils.fetch(`https://weeb-api.vercel.app/genius?query=${term}`)
        if (!data.length) return void M.reply(`Couldn't find any lyrics | "${term}"`)
        const image = await client.utils.getBuffer(data[0].image)
        let caption = `🎊 Title: ${data[0].title} (${data[0].fullTitle})\n🖋️ Artist: ${data[0].artist}`
        const lyrics = await client.utils.fetch(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`)
        caption += `\n\n ${lyrics}`
        return void (await client.sendMessage(M.from, { image, caption }, { quoted: M }))
    }
}
