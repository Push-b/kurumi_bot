module.exports = {
    name: 'setcustom',
    aliases: ['sc'],
    category: 'group',
    react: "✅",
    description: 'sets your custom welcome',
    async execute(client, arg, M) {

  const groupId = M.from;
 

  if(!arg){
    M.reply('please write the fucking text')
  }

  const customWelcomeMsgs = await DB.get("customWelcomeMsgs") || {};
  customWelcomeMsgs[groupId] = `${text}`;
  await DB.set("customWelcomeMsgs", customWelcomeMsgs);

  await client.sendMessage(
    M.from,
    {text: "Custom welcome message set for this group"}
  );
}

}
