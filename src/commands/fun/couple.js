module.exports = {
    name: 'couple',
    aliases: ['cou'],
    category: 'fun',
    react: "✅",
    cool: 10,
    description: 'Ship People! ♥',
    async execute(client, arg, M) {

  const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
    
        const groupMetadata = await client.groupMetadata(M.from)
        const member = groupMetadata.participants.map((x) => x.id) || []

        let getRandom = member[Math.floor(Math.random() * member.length)]
        let getRandom2 = member[Math.floor(Math.random() * member.length)]

        if (getRandom === getRandom2) {
            getRandom2 += member[Math.floor(Math.random() * member.length)]
        }

        let text = `@${getRandom.split('@')[0]} ❤️ @${getRandom2.split('@')[0]} Cieeee, What's Going On❤️💖👀`

        client.sendMessage(M.from , {text: text , mentions:  [getRandom , getRandom2]} , {quoted: M} )
        


        //     let text=`@${getRandom.split('@')[0]} ❤️ @${getRandom2.split('@')[0]}Cieeee, What's Going On❤️💖👀`
           
        // await client.sendMessage(M.from , {text: text , mentions: [member]} , {quoted: M})
        // return client.sendMessage(M.from,buttonMessage,{quoted:M})
    }
}
