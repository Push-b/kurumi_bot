module.exports = {
    name: "delcard",
    aliases: ["deldeck"],
    exp: 0,
    react: "✅",
    category: "card game",
    description: "Delete all cards in deck",
    async execute(client, arg, M) {
      try {
        const deck = await client.DB.get(`${M.sender}_Deck`);
        if (!deck || deck.length === 0) {
          return M.reply("Your deck is already empty!");
        }
        await client.DB.delete(`${M.sender}_Deck`);
        console.log(deck)
        return M.reply("All cards have been removed from your deck!");
    
    } catch (err) {
        await client.sendMessage(M.from, {
          image: { url: `${client.utils.errorChan()}` },
          caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`,
        });
      }
    },
  };
  
