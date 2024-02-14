module.exports = {
    name: 'add',
    exp: 10,
    category: 'group',
    description: 'add user to a group',
    async execute(client, arg, M) {
        try{
            const number = arg.replace(/\D+/g,'').replace(/\s+/g,'').toString();
        console.log(number) ;
        
        if (!number.length) return M.reply(`Please write the user's number you want to add`)
        try {
        if(!client.onWhatsApp(M.from,[`${number}@s.whatsapp.net`])) return M.reply(`Bro the person you are trying to add is not on whatsapp`)
        
                
        
                    await client.groupParticipantsUpdate(M.from, [`${number}@s.whatsapp.net`], "add")
                    await client.sendMessage(M.from,{text:`Successfully added`},{quoted:M})
                } catch (error) {
                    console.error(error);
                    await client.sendMessage(M.from, {text: `An error occurred: ${error.message}`}, {quoted: M});
                }
        } catch ( err ){
            console.log(err.message)
        }
    }
}
