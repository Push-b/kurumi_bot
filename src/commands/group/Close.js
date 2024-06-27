const { readFile, writeFile, unlink } = require('fs/promises');
const os = require('os');
const path = require('path');

module.exports = {
  name: 'closegc',
  category: 'group',
  description: 'Close the group chat',
  async execute(client, arg, M) {
    const groupId = M.from;

    // Perform the necessary operations to close the group
    try {
      await client.groupSettingUpdate(groupId, 'announcement');

      // Send a response message
      client.sendMessage(
        groupId,
        {
          text: `The group chat has been closed successfully by *${M.pushName}* ! Only admins can send messages now.`,
        },
        { quoted: M }
      );
    } catch (error) {
      client.sendMessage(
        groupId,
        {
          text: `Failed to close the group chat: ${error.message}`,
        },
        { quoted: M }
      );
    }
  },
}; 
