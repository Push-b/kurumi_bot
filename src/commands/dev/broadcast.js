module.exports = {
    name: 'broadcast',
    aliases: ['bc'],
    category: 'dev',
    react: "✅",
    description: 'Will make a broadcast for groups where the bot is in. Can be used to make announcements',
    async execute(client, arg, M) {
       try{
        
        if (!arg) return M.reply('🟥 *Oops! It seems like you forgot to provide a query for the broadcast. Please enter a message or query to proceed.*')

        const getGroups = await client.groupFetchAllParticipating()
     
        const groups = Object.entries(getGroups)
        .slice(0)
        .map((entry) => entry[1])
        
        const res = groups.map((v) => v.id)
        M.reply(`Broadcasting in ${res.length} Group Chat, in ${res.length * 5.5} seconds`)
        
        for (let i of res) {
            const groupMetadata = await client.groupMetadata(i)
            const groupMembers = groupMetadata?.participants.map((x) => x.id) || []
            const text = `*⛩️─❮ ARCHER'S BROADCAST ❯─⛩️*\n\n📜 Message: ${arg}\n\n🌀 *Regards:* @${M.sender.split("@")[0]}`
            await client.sendMessage(i, {
                video: {
                    url: 'https://telegra.ph/file/b6c28e0028fe1a3e68ead.mp4'
                },
                gifPlayback: true,
                mentions: groupMembers,
                caption: `${text}`,
            })
        }
        
        M.reply(`✅ Broadcast Message sent to *${res.length} groups*.`)
    
    }catch(err){
        await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
      }
    }
}
//M.quoted.mtype === 'imageMessage',
