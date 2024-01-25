const objToString = (obj) => {
    let str = ''
    for (const p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str += p + ':' + obj[p] + '\n'
        }
    }
    return str
}

module.exports = {
    name: 'inventory',
    aliases: ['invt'],
    category: 'rpg',
    exp: 7,
    react: "✅",
    description: 'Gives you details about your inventory',
    async execute(client, arg, M) {
     const rpg = (await client.DB.get('rpg')) || []
   if (!rpg.includes(M.from)) return M.reply(` *🟥 rpg is not enabled in current group ask mods to activate* `)
        const invemtory = await client.rpg.get(M.sender)
        if (!invemtory) return M.reply('You have no inventory')
        let text = '*━━━❰🌀YOUR_INVENTORY🌀❱━━━*\n\n'
        for (const [key, value] of Object.entries(invemtory)) {
            text += `>>> *${key}:* ${typeof value == 'number' ? value : '\n' + objToString(value)}`
        }
        M.reply(text)
    }
    }
