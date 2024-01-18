const axios = require("axios");

module.exports = {
  name: "card-give",
  aliases: ["cg"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "Give a card to another user",
  async execute(client, arg, M) {
  
    try{
      
      
      //user collection data
      const collection = await client.DB.get(`${M.sender}_Collection`) || [];
    
      //user deck data
      const deck = await client.DB.get(`${M.sender}_Deck`) || [];
    
      //Check if user send card name or index
      if (!arg) {
        return M.reply("🤖 Please select the card you wish to give by providing its index or name.");
      }
    
      //Card position in user deck
      const position = parseInt(arg[0], 10) - 1

      //Check if user send valid number
      if (isNaN(position)) return (await M.reply('🔍 Please enter a valid index number for the card you want to view.'))
  
      //Check if the index is available on user deck
      if (position < 0 || position >= deck.length) return (await M.reply('🔍 Please enter a valid index number for the card you want to view.'))
    
      //Check if use mention or tag someone
      if (!M.mentions[0].length) {
        return M.reply("Please tag the user you sre giving card.");
      }
  
      //Get mentioned user deck
      const mentionedUserDeck = await client.DB.get(`${M.mentions[0]}_Deck`) || [];

      //card position on deck
      const card = deck[position];
   
      //Push the card to mentioned user's decl
      mentionedUserDeck.push(card);
    
      deck.splice(position, 1);
    
      //Remove the card from user deck
      await client.DB.set(`${M.sender}_Deck`, deck);

      //Add the card from user deck
      await client.DB.set(`${M.mentions[0]}_Deck`, mentionedUserDeck);

      let mentionUser = M.mentions[0]
    
      //Get card data from json
      const { data } = await axios.get('https://raw.githubusercontent.com/REDZEOX/Kitagawa-Marin/main/card.json');
    
      const cardData = data.find((cardData) => cardData.title === card.split("-")[0] && cardData.tier === card.split("-")[1]);
    
      //get url from json to send as image
      let url = cardData.url
    
      //Card Reply Message
      const replyMsg = cardData ? `🃏 Card *${cardData.title} - ${cardData.tier}* has been gifted to @${mentionUser.split('@')[0]} ! 🎁` : `🃏 Card has been gived to @${mentionUser.split('@')[0]} ! 🎁`;

      //Check if card url from json is gif. if its gif send it as video
      if(url.endsWith(".gif")){
        await client.sendMessage(M.from , {video : {url: url} , gifPlayback: true , caption: replyMsg ,  mentions: [M.mentions[0]]} , {quoted: M})
      }
  
      //If image it will send as image
      else{
        await client.sendMessage(M.from , {image : {url: url} , caption: replyMsg ,  mentions: [M.mentions[0]]} , {quoted: M})
      }
    
    }
    //Our beloved error chan. No one can stop her!
    catch(err){
      await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.errText()} Error-Chan Dis\n\nError:\n${err}`})
    }
  },
};
