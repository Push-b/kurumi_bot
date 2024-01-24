module.exports = {
    name: 'alive',
    aliases: ['a'],
    category: 'group',
    cool: 30,
    react: "✅",
    description: 'Testing stuff',
    async execute(client, arg, M) {
        
        const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
        M.reply(
            `Everything is working l guess ${
                (await client.contact.getContact(M.sender, client)).username
            } | *Exp:* ${await client.exp.get(M.sender)} *Level:* ${(await client.DB.get(`${M.sender}_LEVEL`)) || 0}`
        )
    }
}
