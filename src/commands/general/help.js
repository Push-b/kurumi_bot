const thumbnailUrls = [
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
    'https://telegra.ph/file/505307775b32d70bb432e.jpg',
];

function getRandomThumbnailUrl() {
    const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
    return thumbnailUrls[randomIndex];
}

module.exports = {
    name: 'help',
    aliases: ['h', 'menu', 'list'],
    category: 'general',
    exp: 10,
    react: "♥️",
    description: 'Displays the command list or specific command info',
    async execute(client, arg, M) {
        try {
            const thumbnailUrl = getRandomThumbnailUrl();

            let message = '';
            if (!arg) {
                // Generating the command list
                message = `*❱━━━「A.R.C.H.E.R」━━━❰*\n\n*${greeting}* ${pushName}. \n\nThis help menu is designed to help you get started with the bot.\n\n⟾ *📪Command List📪*\n\n${commands}`;
                message += `📚Notes: *➪Use ${client.prefix}help <command_name> for more info of a specific command.*\n*➪Example: /help hello.*`;
            } else {
                // Retrieving detailed info about a specific command
                const command = client.cmd.get(arg) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(arg))
                if (!command) return M.reply('Command not found');
                message = `*CMD INFO*\n\n*𒉽 Name:* ${command.name}\n*𒉽 Aliases:* ${command.aliases.join(', ')}\n*𒉽 Desc:* ${command.description}`;
            }

            await M.reply(message, 'text', undefined, undefined, undefined, [M.sender.jid], {
                title: client.utils.capitalize(`${client.config.name} Commands`),
                thumbnail: await client.utils.getBuffer(thumbnailUrl),
                mediaType: 1
            });
        } catch (err) {
           await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        }
    }
};
