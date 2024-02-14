const axios = require('axios')
const fs=require("fs")

module.exports={
    name:"define",
    aliases:['define'],
    description:"Gives you the meaning of your word ",
    category:"fun",
    react:"📖",
    async execute(client, arg, M) {
if (!arg) return M.reply(`Please give me text.`)
try {
    const  data  = await axios.get(`https://urban-dictionary-api.0xn1nja.repl.co/api?word=${arg}`);

const res = data.data
    let img = res.mug_back_image;
    // const { definition, example } = data.list[0];
    const reply = `
*🔠 Word:* ${arg}
*📖 Definition:* ${res.meaning.replace(/\[|\]/g, '')}
*💭 Example:* ${res.example.replace(/\[|\]/g, '')}
    `;
   client.sendMessage(M.from,{image: {url: img} ,caption:reply},{quoted:M})
} catch (err) { 
    console.log(err)
    return M.reply (`*${arg}* isn't a valid text`)
    }
  }
}
