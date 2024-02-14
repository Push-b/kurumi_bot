const maker = require('mumaker')

module.exports = {
    name: '3dneon',
    aliases: ['3dn'],
    category: 'logo maker',
    exp: 5,
    cool: 10,
    react: "🍁",
    description: "Make text logo.",
    async execute(client, arg, M) {
        if(!arg) return M.reply(`Usage: *${client.prefix}3dneon Deryl*`);
        maker.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [
    `${arg}`,]).then((data) => client.sendMessage(M.from, { image: { url: data }, caption: `Here you go` }, { quoted: M }))
    //Our beloved error chan. No one can stop her!
    .catch((err) => client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`}))
    
    }
}
