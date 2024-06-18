const axios = require('axios');

module.exports = {
    name: 'fact',
    aliases: ['ft'],
    category: 'fun',
    react: "✅",
    usage: 'Use :fact',
    description: 'Sends random facts',
    async execute(client, arg, M) { 
        try {
            const response = await axios.get('https://nekos.life/api/v2/fact');
            const text = `Fact for you: ${response.data.fact}`;
            M.reply(text);
        } catch (err) {
            console.error('Error fetching fact:', err);
            M.reply('Error fetching fact. Please try again later.');
        }
    }
};
