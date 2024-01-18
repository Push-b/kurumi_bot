module.exports = {
  name: 'addmods',
  aliases: ['addmod'],
  category: 'dev',
  react: '✅',
  description: 'Adds a new mod to the bot',
  async execute(client, arg, M) {
      if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
          
          if (!M.mentions.length) return M.reply('🟥 *Mention a user you want to add as mod sir!*')
    const mention = M.mentions[0]

  //   if(!mention) return M.reply(``)

    // Add the new mod to the list
    client.mods.push(mention.split('@')[0]);

    // Send a confirmation message

    M.reply(`*Successfully added @${(await client.contact.getContact(mention, client)).username} as a mod*`);
  }
};
