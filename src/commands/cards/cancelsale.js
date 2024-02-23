module.exports = {
  name: 'cancelsale',
  aliases: ['csale'],
  category: 'card game',
  exp: 5,
  react: "✅",
  description: 'deletes card from sell',
  async execute(client, arg, M) {
 
    const seller = await client.DB.get(`${M.from}.seller`);
    const sell = await client.cards.get(`${M.from}.cards`);
    const user = M.sender;
 
    if (user !== seller){
      M.reply("you can't cancel the sale because you didnt start it bish")
    } else if (!sell){
      M.reply("no cards found on sale")
    } else {
      await client.cards.delete(`${M.from}.cards`);
      await client.cards.delete(`${M.from}.cardPrice`);
      await client.DB.delete(`${M.from}.seller`);
      await client.DB.delete(`${M.from}.index`);
      await client.DB.delete(`${M.from}.id`)
      await client.DB.pull(sale, M.from);
      await client.DB.delete('seller');
      
      M.reply("the card that was on sale is cancelled")
    }
  }
}
