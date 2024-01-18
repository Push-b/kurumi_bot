module.exports = {
    name: 'card-shop',
    aliases: ['card-shop'],
    category: 'economy',
    react: "✅",
    description: 'shows card shop items',
    async execute(client, arg, M) {
        
        const economy = (await client.DB.get('economy')) || []
        
        if(!economy.includes(M.from)) return M.reply("economy is not enabled in current group")
     //Card Game enable checker

        let shop =  `⛺ *|------< CARD SHOP >-------|* ⛺\n\n🎉 *welcome to our card shop.Here are the list of cards* 🎉\n\n*#1*\n\n🔥 *Name:* Madara T6\n\n💰 *Price:* 50000 dollars\n\n🛠️ *Source:* Naruto\n\n*#2*\n\n🔥 *Name:* Goku T6\n\n💰 *Price:* 40000 dollars\n\n🛠️ *Source:* Dragon Ball\n\n*#3*\n\n🔥 *Name:* Yuji Itadori and Sukuna T6\n\n💰 *Price:* 45000 dollars\n\n🛠️ *Source:* Jujutsu Kaisen\n\n*#4*\n\n🔥 *Name:* Tanjiro T6\n\n💰 *Price:* 60000 dollars\n\n🛠️ *Source:* Demon slayer\n\n*#5*\n\n🔥 *Name:* Genos T6\n\n💰 *Price:* 40000 dolllars\n\n🛠️ *Source:* One Punch Man\n\n🔰 *Note:* *Use :buy-card <Index_Number> to select your card.*`
        M.reply(shop)  
    }
}
