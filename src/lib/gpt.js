const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: process.env.openAi
})
const openai = new OpenAIApi(configuration)


/**
 * * @param {string} text
*/

gpt = async (text) => {
    //gpt-3.5-turbo
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `${text}`
            }
        ]
    })

    return {
        response: completion.data.choices[0].message.content
    }
}

/**
     * @param {string} text
     */

createImage = async (text) => {
    const results = await openai.createImage({
        prompt: `${text}`,
        n: 10,
        size: '1024x1024'
    })
    return {
        response: results
    }
}

/**
 * @param {Buffer} buffer
 * @param {string} text
 */

editImage = async (text, buffer) => {
    const response = await openai.createImageEdit(
        buffer, 
        fs.createReadStream('image.png'), 
        `${text}`, 2, '1024x1024'
        )
        return {
            response: results
        }
    }


/**
 * @param {string} text
 */

chat = async (text) => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${text}`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0
    })

    return {
        response: completion.data.choices[0].text
    }
}

module.exports = {
    gpt,
    createImage,
    editImage,
    chat
}
