const axios = require("axios");

module.exports = {
  name: "swap",
  aliases: ["swapcards"],
  exp: 0,
  react: "✅",
  category: "card game",
  description: "Swap two cards in your deck",
  async execute(client, arg, M) {
    
    const cardgame = (await client.DB.get('card-game')) || []
    
  //  if(!cardgame.includes(M.from)){
   //   return M.reply("Card game is not enabled here")
  //  }
  
    try{

      let pc = await client.DB.get(`${M.sender}_Deck`) || [];

    if (!arg[0] || isNaN(arg[0]) || arg[0].includes("-") || arg[0].includes("+") || (pc.length - parseInt(arg[0])) < 0) {
        M.reply("Please provide a valid first card index.");
        return;
    }

    if (!arg[1] || isNaN(arg[1]) || arg[1].includes("-") || arg[1].includes("+") || (pc.length - parseInt(arg[1])) < 0) {
        M.reply("Please provide a valid second card index.");
        return;
    }

    const index1 = parseInt(arg.split(' ')[0]) - 1;
    const index2 = parseInt(arg.split(' ')[1]) - 1 ;

    if (index1 === index2) {
        M.reply("The two indices provided cannot be the same.");
        return;
    }

    const newArray = [...pc];
    const temp = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = temp;

    await client.DB.delete(`${M.sender}_Deck`);


    for (let i = 0; i < pc.length; i++) {
        await client.DB.push(`${M.sender}_Deck`, newArray[i]);
      }
      

    M.reply(`Cards at index ${index1} and ${index2} have been swapped.`);
    
    }catch(err){
      await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
    }
  },
};
