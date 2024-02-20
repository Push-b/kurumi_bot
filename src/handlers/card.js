const cron = require("node-cron")
const axios = require('axios')
const path = require('path')
require("./Message");

module.exports = CardHandler = async (client, m) => {
  try {
    let cardgame = await client.DB.get("cardgame");
    const cardgames = cardgames || [];
     const jid = '120363043742977407@g.us'; //send group
   //  const jid = '120363196346357953@g.us'; // send group
   //  const jid =  '120363239128730785@g.us' // send group

     if (cardgame.includes(jid)) {
			let sOr6Counter = 0,
				tokens = '',
				stars;
			const sOr6Interval = 35,
				sOr6Limit = 2;

			cron.schedule('*/16 * * * *', async () => {
				try {
				  const filePath = path.join(__dirname,'./card.json');
					const jsonData = require(filePath);

					const index = Math.floor(Math.random() * jsonData.length),
						obj = jsonData[index];
					let tokens, stars;

					if (obj.tier === '1') {
						tokens = client.utils.getRandomInt(5, 10);
						stars = "⭐";
					} else if (obj.tier === '2') {
						tokens = client.utils.getRandomInt(10, 30);
						stars = "⭐⭐";
					} else if (obj.tier === '3') {
						tokens = client.utils.getRandomInt(30, 40);
						stars = "⭐⭐⭐";
					} else if (obj.tier === '4') {
						tokens = client.utils.getRandomInt(50, 80);
						stars = "⭐⭐⭐⭐";
					} else if (obj.tier === '5') {
						tokens = client.utils.getRandomInt(100, 140);
						stars = "⭐⭐⭐⭐⭐";
					} else if (obj.tier === '6') {
						tokens = client.utils.getRandomInt(150, 300);
						stars = "🌟";
					} else if (obj.tier === 'S') {
						tokens = client.utils.getRandomInt(500, 1000);
						stars = "🌟🌟";
					}

					sOr6Counter++;

					if (sOr6Counter === sOr6Interval && sOr6Counter <= sOr6Interval * sOr6Limit) {
						const filteredData = data.filter((card) => card.tier === 'S' || card.tier === '6');
						const index = Math.floor(Math.random() * filteredData.length),
							obj = filteredData[index];
						if (obj.tier === '6') {
							tokens = client.utils.getRandomInt(1500, 3000);
							stars = "🌟";
						} else if (obj.tier === 'S') {
							tokens = client.utils.getRandomInt(5000, 10000);
							stars = "🌟🌟";
						}
					}

					const existingCard = await Card.findOne({
						jid: jid
					});

					if (existingCard) {
						existingCard.Getcard = `${obj.title}-${obj.tier}-${obj.url}`;
						existingCard.card_price = tokens;
						await existingCard.save();
					} else {
						const newCard = new Card({
							jid: `${jid}`,
							Getcard: `${obj.title}-${obj.tier}-${obj.url}`,
							card_price: tokens
						});
						await newCard.save();
					}

					let caption = `🃏 *━『 ANIME-CARD 』━* 🃏\n\n🧨 Name: ${obj.title}\n\n👑 Tier: ${obj.tier}\n\n🧨 Star: ${stars}\n\n💰 Tokens: ${tokens}\n\n🎐 *Info:* These cards are originally owned by *https://shoob.gg*. We are using them with all the required permissions.\n\n🎗️ [ Use *${client.prefix}collect* to claim the card, *${client.prefix}collection* to see your *Cards* ]`;

					if (obj.tier.includes('6') || obj.tier.includes('S') || obj.url.endsWith(".gif")) {
						let buffer = await client.utils.gifToMp4(await client.utils.getBuffer(obj.url));
						await client.sendMessage(jid, {
							video: buffer,
							caption,
							gifPlayback: true
						});
					} else {
						await client.sendMessage(jid, {
							image: {url: obj.url},
							caption
						})
					}
				} catch (err) {
					console.log(err)
					await client.sendMessage(jid, {
						image: {
							url: `${client.utils.errorChan()}`
						},
						caption: `${client.utils.greetings()} Error-Chan Dis\nAn error occurs while fetching card`
					});
				}

				cron.schedule('*/5 * * * *', async () => {
					try {
						console.log("Removing card every 50 seconds");
						await Card.findOneAndUpdate(
							{ jid: jid },
							{
								$unset: {
									Getcard: '',
									card_price: '',
									claimed: ''
								}
							}
							);
							console.log("Card removed");
						} catch (err) {
							console.log("Error removing card:", err);
						}
					});
				});
			}
		} catch (error) {
			console.log(error);
		}
};
