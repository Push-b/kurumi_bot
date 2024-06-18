module.exports = {
    name: 'invest',
    aliases: ['iv'],
    category: 'economy',
    react: "✅",
    description: 'Invest money for a duration of time',
    async execute(client, arg, M) {
    
        const thumbnailUrls = [
            'https://telegra.ph/file/0ba278843b95f6ad9d4ec.jpg',
            'https://telegra.ph/file/fdf7042ca9594403dd760.jpg',
            'https://telegra.ph/file/aab1139a3b8369fe37810.jpg',
        ];

        function getRandomThumbnailUrl() {
            const randomIndex = Math.floor(Math.random() * thumbnailUrls.length);
            return thumbnailUrls[randomIndex];
        }

        const thumbnailUrl = getRandomThumbnailUrl();

        if (!arg) return M.reply('Please provide the amount and duration (e.g., 100 1 hour)');
        
        const [amountStr, durationStr] = arg.split(' ');
        const amount = parseInt(amountStr);
        const duration = parseInt(durationStr);

        if (isNaN(amount) || isNaN(duration) || amount <= 0 || duration <= 0) 
            return M.reply('Please provide a valid amount and duration.');

        const credits = (await client.cradit.get(`${M.sender}.wallet`)) || 0;
        if ((credits - amount) < 0) return M.reply('You don\'t have enough money in your wallet.');

        // Adjust the investment logic as per your requirement
        const investmentMultiplier = 1; // You can adjust this multiplier based on the duration and amount
        const investmentReturns = amount * duration * investmentMultiplier;

        await client.cradit.add(`${M.sender}.bank`, investmentReturns);
        await client.cradit.sub(`${M.sender}.wallet`, amount);

        const walletBalance = await client.cradit.get(`${M.sender}.wallet`) || 0;

        await client.sendMessage(
            M.from, {
                text: `💳 You have successfully invested ${amount} for ${duration} hours.\n\n💵 Wallet Balance: ${walletBalance} dollars`,
                contextInfo: {
                    externalAdReply: {
                        title: 'Wallet',
                        body: '🏛️ B A C L A Y S 🏛️',
                        thumbnail: await client.utils.getBuffer(thumbnailUrl),
                        mediaType: 1
                    }
                }
            }
        );
    }
};
