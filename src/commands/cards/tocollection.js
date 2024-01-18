const axios = require("axios");

module.exports = {
  name: "ToColl",
  aliases: ["t2coll","2coll"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "Transfer a card from your deck to your collection",
  async execute(client, arg, M) {

    
    try{
    
    const collection = await client.DB.get(`${M.sender}_Collection`) || [];
    
    const deck = await client.DB.get(`${M.sender}_Deck`) || [];

    const indexOF = parseInt(arg.split(' ')[0])

    if (!indexOF) {
      return M.reply("Please provide the index or name of the card you wish to transfer.");
    }

    const position = isNaN(indexOF) ? deck.findIndex((card) => card === indexOF) : parseInt(indexOF, 10) - 1;
    
    if (position < 0 || position >= deck.length) {
      return M.reply("Invalid card index or name.");
    }

    const card = deck[position];
    
    collection.push(card);
    
    deck.splice(position, 1);

    await client.DB.set(`${M.sender}_Collection`, collection);
    
    await client.DB.set(`${M.sender}_Deck`, deck);

    const { data } = await axios.get('https://raw.githubusercontent.com/REDZEOX/Kitagawa-Marin/main/card.json');
    
    const cardData = data.find((cardData) => cardData.title === card.split("-")[0] && cardData.tier === card.split("-")[1]);
    
    let url = cardData.url
    
    const replyMsg = cardData ? `Sent "${indexOF}" from your deck to your collection! 🃏🔀\n\n👉 Card Details:\nName: ${cardData.title}\nTier: ${cardData.tier}` : `Card transferred from deck to collection.`;
    
    await client.sendMessage(M.from , {image: {url : url } , caption: replyMsg} , {quoted: M} )

    M.reply(replyMsg);

  }catch(err){
    await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
  }
  
  },
};
