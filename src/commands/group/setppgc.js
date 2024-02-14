const { readFile, writeFile, unlink } = require('fs/promises');
const Jimp = require('jimp');
const os = require('os');
const path = require('path');

module.exports = {
  name: 'setppgc',
  category: 'moderation',
  exp: 0,
  description: 'Change pic of group pfp',
  async execute(client, arg, M) {
    const content = JSON.stringify(M.quoted);
    const isMedia = M.type === 'imageMessage';
    const isQuoted = (M.type === 'extendedTextMessage' && content.includes('imageMessage'));

    if (isMedia || isQuoted) {
      let media = isQuoted ? await M.quoted.download() : await M.download();
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, 'profile_picture.jpg');

      // Save the image to the temporary directory
      await writeFile(tempFilePath, media);

      // Process the image
      const buffer = await readFile(tempFilePath);
      const { img } = await generateProfilePicture(buffer);

      // Perform the necessary operations with the image
      await client.query({
        tag: 'iq',
        attrs: {
          to: M.from,
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [{
          tag: 'picture',
          attrs: { type: 'image' },
          content: img
        }]
      });

      // Remove the temporary file
      await unlink(tempFilePath);

      // Send a response message
      client.sendMessage(
        M.from,
        {
          text: `Group profile picture has been updated successfully by *${M.pushName}* !`,
        },
        { quoted: M }
      );
    } else {
      client.sendMessage(M.from, { text: "Reply to an image only" });
    }
  },
};

async function generateProfilePicture(buffer) {
  const jimp = await Jimp.read(buffer);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
