module.exports = {
    name: "addmoney",
    aliases: ["am"],
    category: "dev",
    cool: 15,
    react: "✅",
    description: "Adds money to mentioned user's wallet",
    async execute(client, arg, M) {
      if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
            
      if (!M.mentions.length) return M.reply('🛑 You must tag the user.')
      
      if (!arg) {
        return M.reply('*🛑 Please provide the amount to add*');
    }

    const amountToAdd = parseInt(arg.split(' ')[0])

    if (isNaN(amountToAdd) || amountToAdd <= 0) {
        return M.reply('*Invalid amount. Please provide a positive number*');
    }

    const mentionedUser = M.mentions.length ? M.mentions[0] : M.sender;

    await client.cradit.add(`${M.mentions[0]}.wallet`, amountToAdd);

    const walletBalance = await client.cradit.get(`${mentionedUser}.wallet`) || 0;

      M.reply(`${(await client.contact.getContact(mentionedUser, client)).username}'s wallet has been updated. New balance: ${walletBalance}`);
    }
  };
