module.exports = {
  name: 'opengc',
  category: 'group',
  description: 'Open the group chat',
  async execute(client, arg, M) {
    const groupId = M.from;

    // Perform the necessary operations to open the group
    try {
      await client.groupSettingUpdate(groupId, 'not_announcement');

      // Send a response message
      client.sendMessage(
        groupId,
        {
          text: `The group chat has been opened successfully by *${M.pushName}* ! All members can send messages now.`,
        },
        { quoted: M }
      );
    } catch (error) {
      client.sendMessage(
        groupId,
        {
          text: `Failed to open the group chat: ${error.message}`,
        },
        { quoted: M }
      );
    }
  },
}; 
