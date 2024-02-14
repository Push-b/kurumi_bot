const axios = require('axios')

module.exports = {
    name: "why",
    alias: ["Why"],
    desc: "Gives you random whys.",
    usage:`${prefa}why`,
    category: "Fun",
    react:"📛",

 async execute(client, arg, M) {
 await axios
.get(`https://nekos.life/api/v2/why`)
.then((response) => {
  // console.log(response);
  const text = `📝 *Question:* ${response.data.why}`;
  M.reply(text);
})
.catch((err) => {
  M.reply(`🔍 Error: ${err}`);
});
}
}
