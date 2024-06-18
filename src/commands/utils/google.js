const axios = require('axios');
const Apikey = 'AIzaSyDMbI3nvmQUrfjoCJYLS69Lej1hSXQjnWI';
const cx = 'f07c35702a6a1499c';

module.exports = {
    name: 'getgoogle',
    aliases: ['searchgoogle'],
    category: 'utils',
    react: "✅",
    usage: 'Use :getgoogle <prompt>',
    description: 'Search topics from google.com',
    
    async execute(client, arg, M) {
        
        try {
            if (!arg) return M.reply('Sorry, you did not provide any search term!');

            const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${arg}&key=${Apikey}&cx=${cx}`);

            if (!response.data || !response.data.items || response.data.items.length === 0) {
                return M.reply('❌ Unable to find any results.');
            }

            const results = response.data.items;

            let text = `*❯─『 GOOGLE SEARCH 』─❮*\n\n`;
            for (const result of results) {
                text += `*Title:* ${result.title}\n`;
                text += `*Description:* ${result.snippet}\n`;
                text += `🌐 *Link:* ${result.link}\n\n========================\n`;
            }
            M.reply('Searching the text from web...');

            M.reply(text);
        } catch (error) {
            console.error('Error fetching Google search results:', error);
            M.reply('An error occurred while fetching the search results.');
        }
    }
};
