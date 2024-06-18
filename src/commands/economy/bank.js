const MAX_AMOUNT = 9007199254740991;
module.exports = {
    name: 'bank',
    aliases: ['bk'],
    category: 'economy',
    react: "✅",
    description: 'Shows the bank value',
    async execute(client, arg, M) {
  
        let bank = await client.cradit.get(`${M.sender}.bank`) || 0

        if (bank > MAX_AMOUNT) {
            bank = MAX_AMOUNT;
            await client.cradit.set(`${M.sender}.bank`, bank);
            M.reply("Bank reach maximun amount removing extra amount!")
        }
  
        let text = `🏦 *Bank* 🏦\n\n👤 *Name:* ${(await client.contact.getContact(M.sender, client)).username}\n🔖 *Tag:* #${M.sender.substring(3, 7)}\n💳 *credits:* ${bank}`
        let imageT = await client.utils.generateCreditCardImage(
            (
                await client.contact.getContact(M.sender, client)
            ).username,
            '5/25'
        )
        // return client.sendMessage(M.from,buttonMessage,{quoted:M})
         await client.sendMessage(M.from , {image: imageT , caption: text} , {quoted: M})

    
    }
}

/*
 var buttons = [
            {buttonId: `1`, buttonText: {displayText: `${process.env.PREFIX}help`}, type: 1},
        ]

        let buttonMessage={
            image: await client.utils.generateCreditCardImage(
                (
                    await client.contact.getContact(M.sender, client)
                ).username,
                '5/25'
            ),
            text:`🏦 *Bank* 🏦\n\n👤 *Name:* ${(await client.contact.getContact(M.sender, client)).username}\n🔖 *Tag:* #${M.sender.substring(3, 7)}\n💰 *cradits:* ${bank} 🪙`,
            footer: `${process.env.NAME}`,
            buttons:buttons,
            headerType:1
        }  
*/
