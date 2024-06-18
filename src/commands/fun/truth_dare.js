const TD = require('better-tord');

module.exports = {
    name: 'truth_dare',
    aliases: ['td'],
    category: 'fun',
    react: "✅",
    usage: 'Use :td truth or dare',
    description: 'Gives you truth or dare.',
    async execute(client, arg, message) {
        if (!arg) return message.reply('Please specify "truth" or "dare"!');
        
        const availableOptions = ['truth', 'dare'];
        const option = arg.trim().toLowerCase();

        if (!availableOptions.includes(option)) {
            return message.reply(`Invalid option. Please choose from:\n${availableOptions.join(', ')}`);
        }

        try {
            const result = option === 'truth' ? await TD.get_truth() : await TD.get_dare();
            message.reply(`Here's your ${option}: ${result}`);
        } catch (error) {
            console.error('Error fetching truth or dare:', error);
            message.reply('Sorry, I couldn\'t fetch a truth or dare at the moment. Please try again later.');
        }
    }
};
