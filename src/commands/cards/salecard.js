const axios = require("axios");
module.exports = {
  name: "salecard",
  aliases: ["sale"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "Starts card auction",
  async execute(client, arg, M) {
    const sale = (await client.DB.get('sale')) || [];
    if (sale.includes(M.from)) return M.reply(`A sale is going on use :csale to end the sale`);
    
    try {
      const splitArgs = arg.split('|');
      if (!splitArgs[0] || !splitArgs[1]) {
        return M.reply("give index and price");
      }
      const cardIndex = parseInt(splitArgs[0]) - 1;
      const price = splitArgs[1];
      const deck = await client.DB.get(`${M.sender}_Deck`) || [];
      if (!deck || !deck.length) {
        return M.reply("❗ You do not have any cards in your deck!");
      }
      
      const cardToSell = deck[cardIndex]?.split('-');
      if (!cardToSell) {
        return M.reply("❗ Invalid card index!");
      }

      const { data } = await axios.get('https://raw.githubusercontent.com/REDZEOX/Kitagawa-Marin/main/card.json');
      const cardsInTier = data.filter((cardData) => cardData.tier === cardToSell[1]);
      const cardData = cardsInTier.find((cardData) => cardData.title === cardToSell[0]);  
      const cardUrl = cardData.url;
      const cardName = cardData.title;
      const cardTier = cardData.tier;
      const shopID = client.utils.getRandomInt(10000, 99999);
      const seller = M.sender;
      const sellers = await client.DB.get('seller') || [];
     if (sellers.includes(seller)) {
       return M.reply("you are already selling card in one group cancle it start here");
     }
      
      const sell = await client.DB.get(`${M.from}.cards`);
      if (sell) {
        return M.reply(`❗ You are already selling a card. Use "${client.prefix}csale" to cancel the ongoing sale.`);
      }
      
      const imageUrl = cardUrl;
      let isGif;
      if (cardUrl.endsWith('.gif')) {
        isGif = true;
      } else {
        isGif = false;
      } 
      
      const file = await client.utils.getBuffer(imageUrl);
      const text = `💎Card on sell💎\n\n🌊 name: ${cardName}\n\n🌟 Tier: ${cardTier}\n\n📝 price: ${price}\n\n🎉 ID: ${shopID}\n\n🔰 Use :buycard <saleID> to get card,buy within 10 min or sell will be cancled automatically`;

      let tr = `The sale started by ${seller} is cancled due to no one bought it within 10 min`;
      if (isGif && isGif === true) {
        const giffed = await client.utils.gifToMp4(file);
        await client.sendMessage(M.from, {
          video: giffed,
          gifPlayback: true,
          caption: text
        }, {quoted : M});
      } else {
        await client.sendMessage(M.from, {
          image: file,
          caption: text 
        }, {quoted: M});
      }
      
      await client.cards.set(`${M.from}.cards`, `${cardName}-${cardTier}`);
      await client.cards.set(`${M.from}.cardPrice`, price);
      await client.DB.set(`${M.from}.seller`, seller);
      await client.DB.set(`${M.from}.index`, cardIndex);
      await client.DB.set(`${M.from}.id`, shopID);
      await client.DB.push(sale, M.from);

      sellers.push(seller);
     await client.DB.set('sellers', seller);
    } catch (err) {
      console.log(err);
      await client.sendMessage(M.from, { image: { url: client.utils.errorChan() }, caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}` });
    }
    setTimeout(async () => {
      let tr = `The sale started by ${seller} is cancled due to no one bought it within 10 min`
      await client.cards.delete(`${M.from}.cards`);
      await client.cards.delete(`${M.from}.cardPrice`);
      await client.DB.delete(`${M.from}.seller`);
      await client.DB.delete(`${M.from}.index`);
      await client.DB.delete(`${M.from}.id`);
      await client.DB.pull(sale, M.from);
      M.reply(tr);
    }, 600000);
  }
};
