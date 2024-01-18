module.exports = {
    name: 'tiktok',
    category: 'proUsers',
    description: 'Downloads given instagram video and sends it as Audio',
    react: "✅",
    async execute(client, arg, M) {
   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

  if (!arg)
        return client.sendMessage(
          M.from,
          { text: `⚠️ Please provide a Tiktok Video link !` },
          { quoted: M }
        );

        if(!arg.includes("tiktok")){
          return M.reply("⚠️ Please provide a valid Tiktok link!")
        }

        require('../../lib/tiktokscrapper').Tiktok(arg).then( data => {
            client.sendMessage(M.from, { video: { url: data.watermark },caption:`For you by Deryl`},{ quoted: M })
        })
        },
    }
