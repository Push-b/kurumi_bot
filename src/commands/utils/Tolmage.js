module.exports = {
    name: 'toimg',
    aliases: ['inimg'],
    category: 'utils',
    react: "✅",
    usage: 'Use :toimg attached or quoted to the sticker',
    description: 'Converts sticker to image/gif as its media type',
  
    async execute(client, arg, M) {

        try {
            if (!M.quoted || (M.quoted && M.quoted.mtype !== 'stickerMessage')) {
                return M.reply('*Quote the sticker that you want to convert, Baka!*');
            }

            // Download the sticker
            const buffer = await M.quoted.download();

            // Check if the sticker is animated
            const isAnimated = M.quoted.message.stickerMessage.isAnimated;
            const type = isAnimated ? 'video' : 'image';

            // Convert the sticker to image/gif
            const result = isAnimated ? await client.utils.webpToMp4(buffer) : await client.utils.webpToPng(buffer);

            // Send the converted image/gif
            await client.sendMessage(
                M.from,
                {
                    [type]: result,
                    gifPlayback: isAnimated ? true : undefined
                },
                { quoted: M }
            );
        } catch (error) {
            console.error('Error converting sticker to image/gif:', error);
            await M.reply('*Try Again*');
        }
    }
};
