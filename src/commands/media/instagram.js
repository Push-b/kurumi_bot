const axios = require('axios');

module.exports = {
  name: 'instagram',
  aliases: ['instagram','insta'],
  category: 'media',
  react: "✅",
  usage: 'Use :insta <Link>',
  description: 'Sends the content of a given Instagram URL',
  async execute(client, arg, M) { 
    if (!arg || !arg.length) {
      return M.reply('❌ Please provide an Instagram URL');
    }

    const url = arg;
    if (
      !(
        url.includes('instagram.com/p/') ||
        url.includes('instagram.com/reel/') ||
        url.includes('instagram.com/tv/')
      )
    ) {
      return M.reply('❌ Wrong URL! Only Instagram posts, reels, and TV content can be accessed');
    }

    try {
      const { data } = await axios.get(
        `https://weeb-api.vercel.app/insta?url=${url}`
      );
      if (data.urls && data.urls.length > 0) {
        for (const { url: mediaUrl, type } of data.urls) {
          const buffer = await client.utils.getBuffer(mediaUrl);
          const mediaType = type === 'image' ? 'image' : 'video';
          client.sendMessage(M.from, {
            type: mediaType,
            [mediaType]: buffer,
            caption: 'Here is your result', // Adjust the caption as needed
          });
        }
      } else {
        return M.reply('❌ No video/image data found for the provided URL.');
      }
    } catch (error) {
      return M.reply(`❌ Error while getting video/image data: ${error.message}`);
    }
  }
};
