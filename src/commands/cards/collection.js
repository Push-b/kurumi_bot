const axios = require("axios");

module.exports = {
  name: "collection",
  aliases: ["collected" , "coll"],
  cool: 10,
  react: "✅",
  category: "card game",
  react: "🃏",
  description: "View your collection cards",
  async execute(client, arg, M) {
    try {
   const collection = (await client.DB.get(`${M.sender}_Collection`)) || [];
      if (collection.length === 0) {
        return M.reply("You currently don't have any cards in your collection")
      }

      if (!arg) {
        let gifUrls = [];
        let imgUrls = [];
        let response = "🃏 *Your Collection*\n\n";
        collection.coll.forEach((card, index) => {
          response += `${index + 1}. ${card.title} (${card.tier})\n`;
          if (card.url.endsWith(".gif")) {
            gifUrls.push(card.url);
          }else{
            imgUrls.push(card.url);
          }
        });
        response += `\nTo view a specific card, use the command /coll [card index or name].`;
        
        if (gifUrls.length > 0) {
          const randomGif = gifUrls[Math.floor(Math.random() * gifUrls.length)];
          let buffer = await client.utils.gifToMp4(await client.utils.getBuffer(randomGif));
          return await client.sendMessage(M.from , {video: buffer , caption: response , gifPlayback: true} , {quoted: M})
        } else {
          const randomImg = imgUrls[Math.floor(Math.random() * imgUrls.length)];
          return await client.sendMessage(M.from , {image: {url: randomImg } , caption: response} , {quoted: M})
        }
      }

      let card;
      if (!isNaN(arg)) {
        // Argument is a number, assume it's an index
        const index = parseInt(arg, 10) - 1;
        if (index < 0 || index >= collection.coll.length) {
          return M.reply(`🙅‍♀️ Invalid index. Your collection contains ${collection.coll.length} cards.`);
        }
        card = collection.coll[index];
      } else {
        // Argument is not a number, assume it's a card name
        const filteredCards = collection.coll.filter((c) => c.title.toLowerCase() === arg.toLowerCase());
        if (filteredCards.length === 0) {
          return M.reply(`🙅‍♀️ You do not have any card named ${arg}.`);
        }
        card = filteredCards[0];
      }
      let caption = `🃏 *${card.title} (${card.tier})*`

      if(card.url.endsWith(".gif")){

        let buffer = await client.utils.gifToMp4(await client.utils.getBuffer(card.url));
        await client.sendMessage(M.from , {video: buffer , caption , gifToMp4: true }, {quoted: M})
      }else{
        await client.sendMessage(M.from , {image: {url: card.url} , caption }, {quoted: M})
      }
    } catch (err) {
      console.log(err);
      return M.reply("😔 An error occurred while trying to fetch your collection.");
    }
  },
};
