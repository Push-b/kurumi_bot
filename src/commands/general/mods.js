module.exports = {
  name: 'mods',
  aliases: ['modlist'],
  category: 'general',
  react: 'ℹ️',
  description: 'Displays the list of current mods',
  async execute(client, arg, M) {
      if (!client.mods.length) return M.reply('🔴 *No mods available*');

      let modList = '🛡️ *Current Mods* 🛡️\n\n';
      for (let mod of client.mods) {
          const contact = await client.contact.getContact(`${mod}@s.whatsapp.net`, client);
          modList += `@${contact.username}\n`;
      }

      await client.sendMessage(M.from, {
          text: modList,
          mentions: client.mods.map(mod => `${mod}@s.whatsapp.net`)
      });
  }
};
