const axios = require('axios')
const fs=require("fs")

module.exports={
    name:"define",
    alias:['dictionary'],
    usage:`${prefa}define [Your word]`,
    desc:"Gives you the meaning of your word ",
    category:"Education",
    react:"📖",
    async execute(client, arg, M) {
if (!arg) return m.reply(`Please give me text.`)
 const  data  = await axios.get(`https://urban-dictionary-api.0xn1nja.repl.co/api?word=${arg}`);
const res = data.data
    let img = res.mug_back_image;
    // const { definition, example } = data.list[0];
    const reply = `
*🔠 Word:* ${arg}
*📖 Definition:* ${res.meaning.replace(/\[|\]/g, '')}
*💭 Example:* ${res.example.replace(/\[|\]/g, '')}
    `;
    client.sendMessage(
          M.from,
          {
          image: {
          url: img
             },
         caption: reply
            },
            {
         quoted: M
            }
        )
    }
}
