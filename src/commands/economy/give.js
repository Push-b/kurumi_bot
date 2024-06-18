module.exports = {
    name: 'give-m',
    aliases: ['pay-m', 'give-m'],
    category: 'economy',
    react: "✅",
    description: 'Transfer golds to your friend',
    async execute(client, arg, M) {
      
        if (!M.mentions.length) return M.reply('*You must mention someone to give money*')
        const amount = parseInt(arg.split(' ')[0])
        if (!amount) return M.reply('Please provide the amount')
        if (arg.split(' ')[0].startsWith('-') || arg.split(' ')[0].startsWith('+'))
            return M.reply('Please provide the amount')
        const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0
        if ((cradits - amount) < 0) return M.reply('You dont have that much in your wallet')
        await client.cradit.add(`${M.mentions[0]}.wallet`, amount)
        await client.cradit.sub(`${M.sender}.wallet`, amount)
         await client.sendMessage(
          M.from, {
          text: `You gave *${amount}* to *@${M.mentions[0].split('@')[0]}*`,
         contextInfo: {
         externalAdReply: {
        tittle: 'Wallet', 
         body: '💵 D O L L A R S 💵',
        thumbnail: await client.utils.getBuffer('https://telegra.ph/file/79d497d5662dc9a35bca5.jpg'),
        mediaType: 1
            }
         }
      })
    }
  } 
        
