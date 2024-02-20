module.exports = {

  name: "collect",

  aliases: ["c"],

  exp: 0,

  react: "✅",

  category: "card game",

  description: "Claim the card",

  async execute(client, arg, M) {

    

    const card = await client.cards.get(`${M.from}.card`);

    const cardgame = (await client.DB.get('card-game')) || []

console.log(cardgame)

    const cardPrice = await client.cards.get(`${M.from}.card_price`);

    

    const deck = await client.DB.get(`${M.sender}_Deck`) || [];

    

    const collection = await client.DB.get(`${M.sender}_Collection`) || [];

    

    let wallet = await client.cradit.get(`${M.sender}.wallet`) || 0

     // Check if the card has already been claimed

     const claimedCards = await client.DB.get('claimed-cards') || [];

     if (claimedCards.includes(card)) {

       return M.reply("This card has already been claimed by another user.");

     }

 

     // Update the claimed cards list

     claimedCards.push(card);

     await client.DB.set('claimed-cards', claimedCards);

     

    if(!cardgame.includes(M.from)){

      return M.reply("Card game is not enabled here")

    }

    try{

      if (!card) {

        return M.reply("🙅‍♀️ Sorry, there are currently no available cards to claim!");

      }

  

      if(wallet === 0) return M.reply("You have empty wallet")

  

      if ((wallet - cardPrice) < 0) return M.reply(`You dont have that much in your wallet ${wallet}`)

      const [title, tier] = card.split("-");

      

      if (deck.includes(card)) {

        return M.reply(`🛑 You already have the card 🃏 ${title} (Tier ${tier}) in your deck.`);

      } else if (collection.includes(card)) {

        return M.reply(`🛑 You already have the card 🃏 ${title} (Tier ${tier}) in your collection.`);

      }

    

      if (wallet < cardPrice) {

        M.reply("🤑 Sorry, it seems like you don't have enough money in your wallet to claim this card!");

      } else {

        await client.cradit.sub(`${M.sender}.wallet`, cardPrice);

      }

      

      let text = `🃏 ${title} (${tier}) have safely stored in your deck!`

      if (deck.length < 12) {

        deck.push(card);

      } else {

        text = `🃏 ${title} (${tier}) have safely stored in your collection!`

        collection.push(card);

      }

      

      await client.DB.set(`${M.sender}_Deck`, deck);

      

      await client.DB.set(`${M.sender}_Collection`, collection);

      const collectionText = collection.reduce(

        (acc, key) => `${acc}\n- ${client.cards.get(key)}`,"");

        await M.reply(

          '🎉 You have successfully claimed'.concat(

            ' *',

            title,

            ' - ',

            tier,

            '* for *',

            cardPrice,

            ' Credits* ',

            text

            )

            ) 

          }catch(err){

            await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})

          }

        },

      };

  

                       
