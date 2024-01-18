module.exports = {
    name: 'leave',
    aliases: ['bye'],
    category: 'dev',
    react: "✅",
    description: 'Bot leaves the group',
    async execute(client, arg, M) {
        client.groupLeave(M.from).catch((res) => M.reply('🟥 *Something went wrong please check the link*'))
    }
}
//M.quoted.mtype === 'imageMessage',
