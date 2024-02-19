module.exports = {
 command: 'instagram',
 aliases: ['ig'],
 category: 'media',
 description: 'Downloads media from instagram',
  react: "🎵",
      async execute(client, arg, M) {
   if (!arg)
        return client.sendMessage(M.from, { text: `⚠️ Please provide a Instagram Video link !` }, { quoted: M });
      if (!arg.includes("instagram.com"))
        return client.sendMessage(M.from, { text: `⚠️ Please provide a valid Instagram Video link !` }, { quoted: M });
  
      const url = arg.split(" ");
      M.reply("*Mattekudasai, aku sama...*");
      const res = await axios.get(`https://weeb-api.vercel.app/insta?url=${url}`);
      const scrappedURL = res.data.videoUrl;
  
      return client.sendMessage(M.from, { video: { url: scrappedURL }, caption: `For Aku by aku` }, { quoted: M });
    }
  };
  
