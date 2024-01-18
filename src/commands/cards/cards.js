const axios = require("axios");

module.exports = {
  name: "card",
  aliases: ["cards"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "View your all cards",
  async execute(client, arg, M) {
    
    //User collection , deck and card-gamer enabler
    const collection = await client.DB.get(`${M.sender}_Collection`) || [];
    
 //   const cardgame = (await client.DB.get('card-game')) || []
    
    const deck = await client.DB.get(`${M.sender}_Deck`) || [];

   // if(!cardgame.includes(M.from)){
  //    return M.reply("Card game is not enabled here")
 //   }
    
    try {

      //Check if user have card on their deck
      if (collection.length === 0) {
        return M.reply("Sorry, you don't have any cards in your collection and deck.");
      }

      //filter user card index
      const uniqueCards = collection.filter((card, index) => {
        return collection.indexOf(card) === index;
      });

      //user tag and text message 
      let tag = M.sender.substring(3, 7);
      let tr = `*🃏 Name:* ${(await client.contact.getContact(M.sender, client)).username} #${tag}*\n\n*🔖 Total claimed Cards:* ${uniqueCards.length + deck.length}↯\n\n`;

      //Check if user deck is empty or not and sends card in deck
      if (deck.length > 0) {
        tr += "*🎴 Your Deck:*\n";
        const sortedDeck = deck.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
        sortedDeck.forEach((card, index) => {
          const [name, tier] = card.split("-");
          tr += `${index + 1}. ${name} (Tier: ${tier})\n\n`;
        });
      }
            
      tr += "*🎴 Your Collection:*\n";
     
      //split " - " from db
      const sortedCollection = uniqueCards.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
      
      sortedCollection.forEach((card, index) => {
        const [name, tier] = card.split("-");
        tr += `${index + 1}. ${name} (Tier: ${tier})\n`;
      });
      
      //Randomise cards 
      const index = Math.floor(Math.random() * uniqueCards.length);
      
      const card = uniqueCards[index].split("-");
     
      const { data } = await axios.get("https://raw.githubusercontent.com/REDZEOX/Kitagawa-Marin/main/card.json");
      
      const newArray = data.filter(function (I) {
        return I.tier == card[1];
      });
      
      const cardData = newArray.find((cardData) => cardData.title == card[0]);
      
      const imageUrl = cardData.url;
      
      if (imageUrl.endsWith(".gif")) {
        return await client.sendMessage(M.from, { video: { url: imageUrl }, caption: tr, gifPlayback: true }, { quoted: M })
      } else {
        return await client.sendMessage(M.from, { image: { url: imageUrl }, caption: tr }, { quoted: M })
      }

    }catch(err){
      await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
    }
  },
};
