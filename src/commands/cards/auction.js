const axios = require("axios");
const path = require('path');
module.exports = {
  name: "auction",
  aliases: ["auc"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "Starts card auction",
  async execute(client, arg, M) {
  const auction = (await client.DB.get('auction')) || [];
    if (!auction.includes(M.from)) return M.reply(`join auction gc by using ${client.prefix}support`);

    try {
      const splitArgs = arg.split('|')
      if(!splitArgs[0] || !splitArgs[1]) {
        return M.reply ("give index and price")
      }
      const cardIndex = parseInt(splitArgs[0]) - 1;
      const price = splitArgs[1];
      const deck = await client.DB.get(`${M.sender}_Deck`) || []
      if (!deck || !deck.length) {
        return M.reply("❗ You do not have any cards in your deck!");
      }
      const cardToSell = deck[cardIndex].split('-')
      const filePath = path.join(__dirname, './event.json');
	     const data = require(filePath);
      const cardsInTier = data.filter((cardData) => cardData.tier === cardToSell[1]);
      const cardData = cardsInTier.find((cardData) => cardData.title === cardToSell[0]);  
      const cardUrl = cardData.url
      const cardName = cardData.title
      const cardTier = cardData.tier
    //  const cardSource = cardData.source
      if (!cardToSell) {
        return M.reply("❗ The card index you provided is invalid!");
      }
      const imageUrl = cardUrl
      let isGif
      if(imageUrl.endsWith('.gif')) {
        isGif = true
      }
      else {
        isGif = false
      } 
      const file = await client.utils.getBuffer(imageUrl)
      const text = `💎 *Card on Auction* 💎\n\n🌊 *Name:* ${cardName}\n\n🌟 *Tier:* ${cardTier}\n\n📝 *Price:* ${price}\n\n🎉 *Highest user gets card* 🎉\n\n🔰 Use :bid <amount> to bid`
      if(isGif && isGif === true) {
        const giffed = await client.utils.gifToMp4(file)
        await client.sendMessage(M.from, {
          video: giffed,
          gifPlayback: true,
          caption: text
        }, {quoted : M})
      } else {
        await client.sendMessage(M.from, {
          image: file,
          caption: text 
        }, {quoted: M})
    }
    } catch (err) {
      console.log(err);
      await client.sendMessage(M.from, { image: { url: client.utils.errorChan() }, caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}` });
    }
  }
}
