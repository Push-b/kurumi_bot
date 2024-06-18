
const axios = require('axios');

module.exports = {
  name: "dictionary",
  aliases: ["dictionary"],
  react: "✅",
  category: "fun",
  description: "Defines any word suggested by you from the urban dictionary",
  async execute(client, arg, M) {
        if (!arg) return void M.reply('Please provide a word .')
        const term = arg.trim()
        await axios
            .get(`http://api.urbandictionary.com/v0/define?term=${term}`)
            .then((response) => {
                // console.log(response);
                const text = `📚 *Urban dictionary :* ${term}\n\n📖 *Definition :* ${response.data.list[0].definition
                    .replace(/\[/g, '')
                    .replace(/\]/g, '')}\n\n💬 *Example :* ${response.data.list[0].example
                    .replace(/\[/g, '')
                    .replace(/\]/g, '')}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`Sorry, couldn't find any definition related to *${term}*.`)
            })
    }
}
