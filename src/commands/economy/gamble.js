const { Sticker } = require('wa-sticker-formatter')

module.exports = {
    name: 'gamble',
    aliases: ['gb'],
    category: 'economy',
    react: "✅",
    description: 'Gambles your money and increse',
    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
       const economy = (await client.DB.get('economy')) || []
     if (!economy.includes(M.from)) return M.reply(` *❌ Type .support to get Casino group* `)
        
        const directions = ['right', 'left']
        const amount = parseInt(arg.split(' ')[0])
        if (!amount) return M.reply('Please provide the amount')
        if (!directions.includes(arg.split(' ')[1])) return M.reply('Please provide a valid direction')
        if (arg.split(' ')[0].startsWith('-') || arg.split(' ')[0].startsWith('+'))
            return M.reply('Please provide a valid the amount')
        const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
        if ((cradits - amount) < 0) return M.reply('You dont have that much in your wallet')
        if (amount > 200000) return M.reply('You cannot gameble more than 💵200000 dollars')
        const result = directions[Math.floor(Math.random() * directions.length)]
        await client.cradit.add(`${M.sender}.wallet`, result === arg.split(' ')[1] ? amount : -amount)
        M.reply(result === arg.split(' ')[1] ? `🎉 *You won 💵${amount}*` : `🥀 *You lost 💵${amount}*`)
        const sticker = new Sticker(
            result == 'right'
                ? 'https://i.ibb.co/SrtvnFH/ezgif-com-rotate.gif'
                : 'https://bestanimations.com/media/left/365059883left-arrow-18.gif',
            {
                pack: ' ', // The pack name
                author: ' ', // The author name
                quality: 90,
                type: 'full', // The quality of the output file
                background: '#0000ffff' // The sticker background color (only for full stickers)
            }
        )
        await client.sendMessage(
            M.from,
            {
                sticker: await sticker.build()
            },
            {
                quoted: M
            }
        )
    }
}
