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
 const archer = (await client.DB.get('archer')) || []
 if (!archer.includes(M.from)) return M.reply(`🟥 *Bot is not enabled in current group ask mods to activate* `)
        try {
            const thumbnailUrl = getRandomThumbnailUrl();

            let message = '';
            if (!arg) {
                // Generating the command list
                message = `*❱━━━「A.R.C.H.E.R」━━━❰*\n\n*${greeting}* ${pushName}. \n\nThis help menu is designed to help you get started with the bot.\n\n⟾ *📪Command List📪*\n\n${commands}`;
                message += `📚Notes: *➪Use ${client.prefix}help <command_name> for more info of a specific command.*\n*➪Example: /help hello.*`;
    
           await M.reply(message, 'text', undefined, undefined, undefined, [M.sender.jid], {
                title: client.utils.capitalize(`${client.config.name} Commands`),
                thumbnail: await client.utils.getBuffer(thumbnailUrl),
                mediaType: 1
            });

        const aliases = command.aliases ? command.aliases.join(', ') : 'No Aliases';
        const cooldown = command.cool ? command.cool : 'No cooldown';
        const description = command.description ? command.description : 'No Description'

        const message = `🔴 *Command*: ${command.name}\n🟤 *Aliases*: ${aliases}\n🟢 *Category*: ${command.category}\n⚪ *Cooldown*: ${cooldown}\n🟠 *Desc*: ${description}`;

        M.reply(message)   
        }
    })
 }
