module.exports = {
    name: 'report',
    aliases: ['report'],
    category: 'general',
    react: "✅",
    description: 'Reports user issues',
    async execute(client, arg, M) {
         let videos = [
            'https://telegra.ph/file/f0c24da2961de0bede5e1.mp4',
            'https://telegra.ph/file/f7d87038dc8c486c1a094.mp4',
            'https://telegra.ph/file/672375c8205e1f126f200.mp4'
        ]
  
const ariLogo = "https://i.ibb.co/kcz5R14/Whats-App-Image-2023-02-27-at-12-32-54-AM.jpg"

        let user = M.sender;
        let group = M.from
        let tr = arg;
        let code = client.groupInviteCode(M.from)
        let report = `*『 Report Recieved! 』*\n\n🎯Group = ${group}\n\n⛄Sender = ${user}\n\n📜Message = ${tr}\n\nCode = ${code}`
        let text = `✅ successfully sent your report message to the Mods group hope mods will reply soon.`
        // await client.sendMessage(M.sender , { video: {url: videos} ,caption: final , gifPlayback: true} , { quoted: M})
        // await client.sendMessage(M.from , {image: {url: ariLogo} , caption: `Dmed you the group link`})

        await client.sendMessage("120363196346357953@g.us" ,{text: report} , {quoted:M})
  await client.sendMessage(M.from , {text: text} , {quoted:M})
    }
}
