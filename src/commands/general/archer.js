module.exports = {
    name: 'archer',
    aliases: ['archer'],
    category: 'general',
    exp: 5,
    react: "✅",
    description: 'Bot faq',
    async execute(client, arg, M) {

   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
       

        let caption = `
*━━━❰ FAQ ❱━━━*

📮 *Q1:* How to paly card game in casino?
📑 *A:* A anime card will spawn randomly and user can claim it using tokens! [1token = 1000 dollars]
ᚖ ────── ✪ ────── ᚖ

📮 *Q2:* How do I add ${client.prefix} bot in my group?
📑 *A:* Send the group link in the bot's or owner's DM &  it will join.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q3:* What are the requirements for the bot to join a group?
📑 *A:* First the group must have atleast 50 members for the bot to join & the group must be active.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q4:* How do I earn XP in the group?
📑 *A:* For earning XP you will need to use commands of the bot like reaction command & others.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q5:* Can the bot work in personal message?
📑 *A:* No, the bot will not work.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q6:* Can I call the bot?
📑 *A:* Calling the bot is at your own pleasure but with consequences thus you will be blocked instantly for calling the bot!
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q7:* Where can I find ${client.prefix} bot?
📑 *A:* ${client.prefix} is one of the bots owned by *Deryl* group. Incase you need other bots, use the command *.support* & you will get support group link in your DM.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q8:* Can you hire a bot from *Deryl or Potato?*
📑 *A:* Yes, you can buy the private base from Deryl or Potato only.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q9:* Why is the bot not working in my group?
📑 *A:* There are two main reasons for that, either the bot is lagging due to data traffic or the bot is inactive.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q10:* How can I create a bot like ${client.prefix}?
📑 *A:* You can deploy ${client.prefix} by buying the script from Deryl or Potato.
ᚖ ────── ✪ ────── ᚖ
        
📮 *Q11:* Is the project or the *NCT Association group sponsored?
📑 *A:* Of course not, we're not sponsored either way but it could be your own pleasure to do that thus this is a non-profit organization.
ᚖ ────── ✪ ────── ᚖ`

        await client.sendMessage(M.from, { video : { url : "https://telegra.ph/file/ada8e18271715deadae14.mp4"} , caption: caption , gifPlayback: true} , {quoted: M})
    }
}
