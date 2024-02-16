module.exports = {
    name: 'tiktok',
    category: 'media',
    description: 'Downloads given instagram video and sends it as Audio',
    react: "✅",
    async execute(client, arg, M) {
   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
   const tiktoktoken = await client.media.get(`${M.sender}.tiktoktoken`)
     if (!tiktoktoken) return M.reply(`🟥 You dont have any tiktok token visit the *.media-shop* and buy tiktok tokens!`)
     await client.media.sub(`${M.sender}.tiktoktoken`, 1)
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
