const items = {
    purchase: [
        { musictoken: 10000 },
        { tiktoktoken: 10000 },
        { lyricstoken: 1000 },
        { videotoken: 3000 },
        { spotifytoken: 1000 }
    ]
}

module.exports = {
    name: 'media-shop',
    aliases: ['purchase', 'get'],
    category: 'media',
    exp: 10,
    react: "✅",
    description: 'Buy media tokens',
    async execute(client, arg, M) {
     const command = M.body.split(' ')[0].toLowerCase().slice(client.prefix.length).trim()
        if (command == 'media-shop') {
            const typeEmoji = ['🛍️','⚖️']
            const moneyEmoji = ['💵','💵']
            const types = Object.keys(items)
            let text = '*❰  ⁠● 🎧 Media token SHOP 🎧 ⁠●  ❱*'
            for (const type of types) {
                text += `\n\n*${typeEmoji[types.indexOf(type)]} ${client.utils.capitalize(type)}*\n`
                items[type].filter((x) => {
                    for (const [key, value] of Object.entries(x)) {
                        text += `\n> *${client.utils.capitalize(key)}:* ${value} ${moneyEmoji[types.indexOf(type)]}`
                    }
                })
            }
            text += `\n\n🧸 Use ${client.prefix}purchase <item_name> to get 10 tokens each time you purchase`
            M.reply(text)
        }
        if (command == 'purchase') {
            if (!arg) return M.reply('Please give a item name')
            const term = arg.split(' ')
            const purchaseItems = Object.keys(Object.assign({}, ...items[command]))
            if (!purchaseItems.includes(term[0].toLowerCase())) return M.reply('Please give a valid item name')
            const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
            const price =
                parseInt(Object.values(items[command][purchaseItems.indexOf(term[0].toLowerCase())]).join('')) *
                (term[1] || 1)
            if ((cradits - price) < 0)
                return M.reply(`You dont have that much in your wallet to buy ${term[0].toLowerCase()} ${term[1] || 1}`)
            await client.media.add(`${M.sender}[${term[0].toLowerCase()}]`, 10 * parseInt(term[1] || 1))
            await client.cradit.sub(`${M.sender}.wallet`, price)
            M.reply(
                `*Thank you 🎉 for your purches*\n*Now you have _${client.utils.capitalize(term[0])} : ${(await client.media.get(`${M.sender}[${term[0].toLowerCase()}]`)) || 0
                }_*`
            )
        }
        if (command == 'selling') {
            if (!arg) return M.reply('Please give a item name')
            const term = arg.split(' ')
            const sellingItems = Object.keys(Object.assign({}, ...items[command]))
            if (!sellItems.includes(term[0].toLowerCase())) return M.reply('Please give a valid item name')
            const itemQuantity = await client.media.get(`${M.sender}[${term[0].toLowerCase()}]`)
            if (!itemQuantity) return M.reply('You do not have enough quantity to sell')
            const price = parseInt(Object.values(items[command][sellItems.indexOf(term[0].toLowerCase())]).join(''))
            await client.media.sub(
                `${M.sender}[${term[0].toLowerCase()}]`,
                'all' == term[1].toLowerCase() ? itemQuantity : 1
            )
            await client.cradit.add(`${M.sender}.wallet`, price * ('all' == term[1].toLowerCase() ? itemQuantity : 1))
            M.reply(
                `*Congratulations 🎉 you have gained ${price} by selling ${'all' == term[1].toLowerCase() ? itemQuantity : 1
                } ${client.utils.capitalize(term[0])}*\n*Now you have _${await client.cradit.get(
                    `${M.sender}.wallet`
                )}_ in your wallet*`
            )
        }
    }
}
