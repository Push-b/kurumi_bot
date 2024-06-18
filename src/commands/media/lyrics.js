module.exports = {
  name: 'lyrics',
  aliases: ['lyr'],
  category: 'media',
  react: "✅",
  usage: 'Use :lyrics <song_name>',
  description: 'Sends the lyrics of a given song',
  async execute(client, arg, M) { 
    if (!arg) return M.reply('🟥 *Provide the name of the song to search the lyrics*');

    const term = arg.trim();
    
    try {
      // Fetching data from the API
      const data = await client.utils.fetch(`https://weeb-api.vercel.app/genius?query=${encodeURIComponent(term)}`);
      
      if (!data || !data.length) return M.reply(`🟨 *Couldn't find any lyrics* | "${term}"`);
      
      // Extracting necessary information
      const songData = data[0];
      const { title, fullTitle, artist, image, url } = songData;

      // Fetching lyrics
      const lyrics = await client.utils.fetch(`https://weeb-api.vercel.app/lyrics?url=${url}`);

      // Constructing the caption
      let caption = `🎊 *Title:* ${title} *(${fullTitle})*\n🖋️ *Artist:* ${artist}\n\n${lyrics}`;
      
      // Sending the lyrics with the image (if available)
      if (image) {
        const imageBuffer = await client.utils.getBuffer(image);
        await client.sendMessage(M.from, { image: imageBuffer, caption }, { quoted: M });
      } else {
        await client.sendMessage(M.from, caption, { quoted: M });
      }
    } catch (error) {
      console.error(error);
      M.reply('🟥 *An error occurred while fetching lyrics.*');
    }
  }
};
