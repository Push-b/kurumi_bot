const axios  = require("axios")
module.exports = {
    name: 'couplepp',
    // aliases: ['coffee'],
    category: 'utils',
    cool: 10,
    react: "✅",
    description: 'Sends an image of random anime couple?',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

        let {data} = await axios.get("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json")
        let akusingle = data[Math.floor(Math.random() * data.length)]
        await client.sendMessage(M.from,{image:{url:akusingle.female}, caption: "*For Him*" },{quoted:M})
        await client.sendMessage(M.from,{image:{url:akusingle.male}, caption: "*For Her*" },{quoted:M})
    }
}
