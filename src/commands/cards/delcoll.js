module.exports = {
    name: "delcoll",
    aliases: ["delcollec"],
    exp: 0,
    react: "✅",
    category: "card game",
    description: "Delete all cards in coll",
    async execute(client, arg, M) {
      try {
        const coll = await client.DB.get(`${M.sender}_Collection`);
        if (!coll || coll.length === 0) {
          return M.reply("Your coll is already empty!");
        }
        await client.DB.delete(`${M.sender}_Collection`);
        console.log(coll)
        return M.reply("All cards have been removed from your deck!");
    
    } catch (err) {
        await client.sendMessage(M.from, {
          image: { url: `${client.utils.errorChan()}` },
          caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`,
        });
      }
    },
  };
  
