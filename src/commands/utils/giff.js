
const axios = require('axios');
const key = 'LIVDSRZULELA';

module.exports = {
    name: 'getgif',
    aliases: ['searchgif'],
    category: 'utils',
    react: "✅",
    usage: 'Use :getgif <search_content>',
    description: 'Searches for a gif from the web',
    
    async execute(client, arg, M) {
        
        try {
            if (!arg) return M.reply('Sorry, you did not provide any search term!');
            
            const response = await axios.get(`https://g.tenor.com/v1/search?q=${arg}&key=${key}&limit=8`);
            
            if (!response.data || !response.data.results || response.data.results.length === 0) {
                return M.reply('No gifs found.');
            }
            
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const gifUrl = response.data.results[randomIndex]?.media[0]?.mp4?.url;

            if (!gifUrl) {
                return M.reply('Failed to retrieve gif URL.');
            }
            M.reply('Searching gif from web....');

            client.sendMessage(
                M.from,
                {
                    video: {
                        url: gifUrl
                    },
                    caption: `Here is the search result for your gif search (${arg})`,
                    gifPlayback: true
                },
                {
                    quoted: M
                }
            );
        } catch (error) {
            console.error('Error fetching gif:', error);
            M.reply('An error occurred while fetching the gif.');
        }
    }
};
