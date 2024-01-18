module.exports = {
    name: 'banlist',
    aliases: ['bl'],
    react: "✅",
    category: 'dev',
    description: 'List of all banned user',
    async execute(client, arg, M) {
      try {
        const banned = (await client.DB.get('banned')) || [];
        if (!banned.length) {
          return M.reply('There are no banned users at the moment.');
        }
        const userList = banned.map((user) => `*@${user.split('@')[0]}*`).join('\n');
        
        await client.sendMessage(
            M.from,
            { text: `List of banned users:\n${userList}`, mentions: userList },
            { quoted: M }
            )
            
      } catch (err) {
        await client.sendMessage(M.from, {
          image: { url: `${client.utils.errorChan()}` },
          caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`
        });
      }
    },
  };
