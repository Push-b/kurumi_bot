module.exports = {
 command: 'instagram',
 aliases: ['ig'],
 category: 'media',
 description: 'Downloads media from instagram',
  react: "🎵",
      async execute(client, arg, M) {
        if (!arg.length === 0) return M.reply('❌ Please provide a instagram URL')
       const url = urls;
        if (
            !(
                url.includes('instagram.com/p/') ||
                url.includes('instagram.com/reel/') ||
                url.includes('instagram.com/tv/')
            )
        ) {   return M.reply(`❌ Wrong URL! Only Instagram posted videos, TV, and reels can be downloaded`))
        }
        await client.utils
            .fetch(`https://weeb-api.vercel.app/insta?url=${url}`)
            .then(({ urls }) => {
                urls.forEach(async ({ url, type }) => {
                    const buffer = await client.util.fetchBuffer(url)
                    await M.reply(buffer, type)
                })
            })
            .catch((error) => {
        console.log(error);
        return M.reply(`Error private / not found`);
      });
  },
};
