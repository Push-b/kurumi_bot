const { spotifydl } = require('../../lib/spotify')

module.exports = {
    name: 'spotify',
    aliases: ['sp'],
    category: 'media',
    react: "✅",
    usage: 'Use :spotify <Link>',
    description: 'Downloads given Spotify track and sends it as audio with an image and caption',
    async execute(client, arg, M) {
        const link = arg
        if (!link.includes('https://open.spotify.com/track/'))
            return M.reply('Please use command with a valid youtube.com link')
        const audioSpotify = await spotifydl(link.trim()).catch((err) => {
            return M.reply(err.toString())
            client.log(err, 'red')
        })

        if (spotifydl.error) return M.reply(`Error Fetching: ${link.trim()}. Check if the url is valid and try again`)

        const caption = `🎧 *Title:* ${audioSpotify.data.name || ''}\n🎤 *Artists:* ${(
            audioSpotify.data.artists || []
        ).join(', ')}\n💽 *Album:* ${audioSpotify.data.album_name}\n📆 *Release Date:* ${
            audioSpotify.data.release_date || ''
        }`

        await client.sendMessage(
            M.from,
            {
                image: audioSpotify.coverimage,
                caption: caption
            },
            {
                quoted: M
            }
        )

        await client.sendMessage(
            M.from,
            {
                audio: audioSpotify.audio,
                mimetype: 'audio/mpeg',
                fileName: audioSpotify.data.name + '.mp3'
            },
            {
                quoted: M
            }
        )
    }
}
