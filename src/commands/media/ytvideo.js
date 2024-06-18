const YT = require('../../lib/YT');
const yts = require('yt-search');

module.exports = {
    name: 'ytvideo',
    aliases: ['ytv'],
    category: 'media',
    react: "✅",
    usage: 'Use :ytvideo <video_link>',
    description: 'Downloads given YouTube Video',
    async execute(client, arg, M) {
        try {
            const link = async (term) => {
                const { videos } = await yts(term.trim());
                if (!videos || !videos.length) return null;
                return videos[0].url;
            };

            if (!arg) return M.reply('Please use this command with a valid youtube.com link');

            const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
            const term = validPathDomains.test(arg) ? arg.trim() : await link(arg);
            if (!term) return M.reply('Please use this command with a valid YouTube content link');

            if (!YT.validateURL(term.trim())) return M.reply('Please use this command with a valid youtube.com link');

            const { videoDetails } = await YT.getInfo(term);

            M.reply('Downloading has started, please wait...');

            let text = `*Title:* ${videoDetails.title} | *Type:* Video | *From:* ${videoDetails.ownerChannelName}`;

            // Sending thumbnail and video details
            client.sendMessage(
                M.from,
                {
                    image: {
                        url: `https://i.ytimg.com/vi/${videoDetails.videoId}/maxresdefault.jpg`
                        },
                    caption: text
                },
                {
                    quoted: M
                }
            );

            // Checking if the video is longer than 30 minutes
            if (Number(videoDetails.lengthSeconds) > 1800) return M.reply('Cannot download video longer than 30 minutes');

            // Downloading and sending the video
            const videoBuffer = await YT.getBuffer(term, 'video');
            await client.sendMessage(
                M.from,
                {
                    video: videoBuffer,
                    mimetype: 'video/mp4',
                    fileName: `${videoDetails.title}.mp4`
                },
                {
                    quoted: M
                }
            );
        } catch (error) {
            console.error(error);
            M.reply('An error occurred while downloading the YouTube video.');
        }
    }
};
