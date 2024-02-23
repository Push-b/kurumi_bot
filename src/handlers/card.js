const cron = require("node-cron")
const axios = require('axios')
const path = require('path')
require("./Message");
module.exports = CardHandler = async (client, m) => {
  try {
    let cardgames = await client.DB.get("card-game");
    const cardgame = cardgames || [];
    //  const jid = "120363043742977407@g.us" //send group
    // const jid = '27787800567-1632642032@g.us'

    // if (cardgame.length > 0) {
    //   const randomIndex = Math.floor(Math.random() * cardgame.length)
    //   const randomJid = cardgame[randomIndex]
    //   let jid = randomJid
    //   console.log(jid)
    for (let i = 0; i < cardgame.length; i++) {
      const jid = cardgame[i]
   console.log(jid)

      if (cardgame.includes(jid)) {

        let count = 0;
        let sOr6Counter = 0;
        const sOr6Interval = 30;
        const sOr6Limit = 15;
  
        cron.schedule('*/20 * * * *', async () => {
          try {
             const filePath = path.join(__dirname, './card.json');
	     const data = require(filePath);

	     const index = Math.floor(Math.random() * data.length);
             let obj, price;
                   
              obj = data[index];
              switch (obj.tier) {
                case "1":
                  price = client.utils.getRandomInt(200000, 250000);
                  break;
                case "2":
                  price = client.utils.getRandomInt(300000, 350000);
                  break;
                case "3":
                  price = client.utils.getRandomInt(400000, 450000);
                  break;
                case "4":
                  price = client.utils.getRandomInt(500000, 550000);
                  break;
                case "5":
                  price = client.utils.getRandomInt(600000, 610000);
                  break;
              }
              count++;
            sOr6Counter++;
              // if (count % 6 === 0) {
                if (sOr6Counter === sOr6Interval && sOr6Counter <= (sOr6Interval * sOr6Limit)) {
                const filteredData = data.filter(card => card.tier === "S" || card.tier === "6");
                const index = Math.floor(Math.random() * filteredData.length);
                obj = filteredData[index];
                switch (obj.tier) {
                  case "6":
                    price = client.utils.getRandomInt(900000, 800000);
                    break;
                  case "S":
                    price = client.utils.getRandomInt(1500000, 200000);
                    break;
                    
                }
              }
            
            console.log(`Sended:${obj.tier + "  Name:" + obj.title + "  For " + price + " in " + jid}`);
      await client.cards.set(`${jid}.card`, `${obj.title}-${obj.tier}`);
      await client.cards.set(`${jid}.card_price`, price);
     
  
      
      if (obj.tier.includes('6')|| obj.tier.includes('S')) {
        const giif = await client.utils.getBuffer(obj.url);
        const cgif = await client.utils.gifToMp4(giif);
        return client.sendMessage(jid, {
          video: cgif,
          caption: `🧧 *━『 Woah a rare card spawn 』━* 🧧\n\n🎃 Name: ${obj.title}\n\n🌐 Tier: ${obj.tier}\n\n🌀 Price: ${price}\n\n📤 *Info:* collect as much as you can.\n\n🔮 [ Use *${process.env.PREFIX}collect* to claim the card, *${process.env.PREFIX}collection* to see your *Cards* ]`,
          gifPlayback: true,
        });
      } else {
        return client.sendMessage(jid, {
          image: {
            url: obj.url,
          },
          caption: `🃏 *Anime Card Appeared* 🃏\n\n 👤 Name: ${obj.title}\n\n🌀 Tier: ${obj.tier}\n\n🛍️ Price: ${price}\n\n🧾 *Info:* collect as much as you can .\n\n🔮 [ Use *${process.env.PREFIX}collect* to claim the card, *${process.env.PREFIX}collection* to see your *Cards collection* ]`,
        });
      } 
     
    } catch (err) {
      console.log(err)
      await client.sendMessage(jid , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nCommand no error wa:\n${err}`})
    }
  
    cron.schedule('*/5 * * * *', () => {
      client.cards.delete(`${jid}.card`);
      client.cards.delete(`${jid}.card_price`);
      console.log(`Card deleted after 5minutes`)
  
    })
  
  });
  
  }
    }
    
    } catch(error){
        console.log(error)
    }

}
function newFunction() {
  return "card-game";
}

			  
