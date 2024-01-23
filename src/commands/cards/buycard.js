module.exports = {
  name: 'buycard',
  aliases: ['buycard'],
  category: 'card game',
  exp: 5,
  react: "✅",
  description: 'byys card from sale',
  async execute(client, arg, M) {
  
  const seller = await client.DB.get(`${M.from}.seller`);
  const sell = await client.cards.get(`${M.from}.cards`);
  const deck = await client.DB.get(`${M.sender}_Deck`);
  const decks = await client.DB.get(`${seller}_Deck`);
  const collection = await client.DB.get(`${M.sender}_Collection`);
  const price = await client.DB.get(`${M.from}.cardPrice`);
  const wallet = await client.cradit.get(`${M.sender}.wallet`) || 0;
  const index = await client.DB.get(`${M.from}.index`);
  const id = await client.DB.get(`${M.from}.id`);
  
  if (!arg) M.reply('type :buycard <id>')
   if(price > wallet){
  return M.reply('you have very less money')
   }
  if(!sell){
return M.reply('no cards is for sell')
  }
  else if (deck.includes(sell)) {
        return M.reply(`🛑 You already have the card in your deck.`);
      } else if (collection.includes(sell)) {
        return M.reply(`🛑 You already have the card in your collection.`);
      }
      let text = `🃏 card have safely stored in your deck! and miney had been decreased from your wallet`
      if (deck.length < 12) {
        deck.push(sell);
        decks.splice(index, 1)
        await client.DB.set(`${seller}_Deck`, decks);
      } else {
       let tr = `🃏 card have safely stored in your collection! And money have been decreased from your wallet`
        collection.push(sell);
        decks.splice(index, 1);
        await client.DB.set(`${seller}_Deck`, decks);
      }

            await client.DB.set(`${M.sender}_Deck`, deck);
            await client.DB.set(`${M.sender}_Collection`, collection);
            await client.DB.delete(`${M.from}.seller`);  
            await client.cards.delete(`${M.from}.cards`);
            await client.cards.delete(`${M.from}.cardPrice`);
            await client.DB.delete(`${M.from}.index`);
            await client.DB.delete(`${M.from}.id`);
            await client.DB.pull(sale, M.from);
            await client.DB.delete('seller');
      
      M.reply(text)
    if (deck.length == 12) {
      M.reply(tr)
              }
      }
}  
           
