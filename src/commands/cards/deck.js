const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const { Deck , Coll , Card } =  require("../../Database")

module.exports = {
  name: 'deck',
  aliases: ['decks'],
  cool: 10,
  react: "✅",
  category: 'card game',
  description: 'Shows deck cards',
  async execute(client, arg, M) {
      const cards = (await client.DB.get('cards')) || []
   if (!cards.includes(M.from)) return M.reply(` *🟥 Card-game is not enabled in current group* `)
    
    try {
      const deckData = await client.cradit.get(`${M.sender}.deck`) || 0;
      if (!deckData) return M.reply("You don't have any cards in your deck yet!");
      
      let deck = deckData.deck;
      deck = deck.filter(deck => deck !== null); 

      if (deck.length > 12) {
        const cardsToMove = deck.splice(11);
        const collection = await Coll.findOne({ userId: M.sender });
        if (collection) {
          collection.coll.push(...cardsToMove);
        } else {
          const newCollection = new Coll({ userId: M.sender, coll: cardsToMove });
          await newCollection.save();
        }
        await deckData.save();
        // deckList += `\n${cardsToMove.length} card(s) moved to collection.`;
      }

      if (arg) {
        const index = parseInt(arg) - 1;
        if (isNaN(index) || index < 0 || index >= deck.length) {
          return M.reply(`Invalid index! Please enter a number between 1 and ${deck.length}`);
        }
          
        const card = deck[index];
        let url = card.url
        let caption = `Card ${index + 1}:\n🔖 Title: ${card.title}\n⭐️ Tier: ${card.tier}
`
        const mediaType = url.endsWith('.gif') ? 'video' : 'image';
        if(url.endsWith('.gif')){
          let buffer = await client.utils.gifToMp4(await client.utils.getBuffer(url));
          await client.sendMessage(M.from, { video: buffer , caption , gifPlayback: true }, { quoted: M });
        }else{
          await client.sendMessage(M.from, { image: {url: url} , caption}, { quoted: M })
        }
        
      } else {
        let deckList = `Your deck contains ${deck.length} cards:\n`;
        const gifUrls = [];
        const imgUrls = [];
        console.log(gifUrls);
        deck.forEach((card, index) => {
          deckList += `${index + 1}. ${card.title} (${card.tier})\n`;
          
          if (card.url.endsWith(".gif")) {
            gifUrls.push(card.url);
          }else{
            imgUrls.push(card.url)
          }
        });
        
        if (gifUrls.length > 0) {
          const randomGifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];
          const giif = await client.utils.getBuffer(randomGifUrl);
          const cgif = await client.utils.gifToMp4(giif);
          await client.sendMessage(M.from, { video: cgif, caption: deckList , gifPlayback: true }, { quoted: M });
        } else {
          const canvasWidth = 1050;
          const canvasHeight = 1800;
          const canvas = createCanvas(canvasWidth, canvasHeight);
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          const imageWidth = 350;
          const imageHeight = 450;
          const imagePadding = 10;
          const imagesPerRow = 3;
          const rows = 4;
          const xStart = (canvasWidth - (imageWidth * imagesPerRow + imagePadding * (imagesPerRow - 1))) / 2;
          const yStart = (canvasHeight - (imageHeight * rows + imagePadding * (rows - 1))) / 2;
          
          for (let i = 0; i < imgUrls.length; i++) {
            const image = await loadImage(imgUrls[i]);
            const x = xStart + (i % imagesPerRow) * (imageWidth + imagePadding);
            const y = yStart + Math.floor(i / imagesPerRow) * (imageHeight + imagePadding);
            ctx.drawImage(image, x, y, imageWidth, imageHeight);
          }
          const directory = require('os').tmpdir();
          const filePath = path.join(directory, 'collage.png');
          const buffer = canvas.toBuffer('image/png');
          fs.writeFileSync(filePath, buffer);
          const caption = `_🃏${(await client.contact.getContact(M.sender, client)).username}#${M.sender.substring(3, 7)}\'s Deck🃏_\nTotal Cards: ${deck.length}\n\n${deckList}`;
          client.sendMessage(M.from, {image: {url: filePath},caption: caption,} , {quoted: M});
        }
      }
    } catch (err) {
      console.log(err);
      await client.sendMessage(M.from, {
        image: { url: client.utils.errorChan() },
        caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`,
      });
    }
  },
};
