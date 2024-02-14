const axios = require('axios')

module.exports = {
    name: "why",
    aliases: ["Why"],
    description: "Gives you random whys.",
    category: "fun",
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
