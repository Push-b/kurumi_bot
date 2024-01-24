module.exports = {
  name: 'addpro',
  aliases: ['addpro'],
  category: 'dev',
  react: '✅',
  description: 'Adds a new mod to the bot',
  async execute(client, arg, M) {
      if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
          
          if (!M.mentions.length) return M.reply('🟥 *Mention a user you want to add as a proUser sir!*')
    const mention = M.mentions[0]

  //   if(!mention) return M.reply(``)

    // Add the new proUser to the list
    client.proUser.push(mention.split('@')[0]);

    // Send a confirmation message

    M.reply(`*Successfully added @${(await client.contact.getContact(mention, client)).username} as a proUser*`);
  }
};
