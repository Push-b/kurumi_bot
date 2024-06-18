const ms = require('parse-ms')

module.exports = {

    name: 'bonus',

    aliases: ['bonus'],

    category: 'economy',

    react: "✅",

    description: 'Claims your bonus',

    async execute(client, arg, M) {
        

        const bonustimeout = 31536000000

        const bonusamount = 500000000

        const bonus = await client.cradit.get(`${M.sender}.bonus`)

        let text = ''

        if (bonus !== null && bonustimeout - (Date.now() - bonus) > 0) {

            const bonustime = ms(bonustimeout - (Date.now() - bonus))

            text += `*You have already claimed your bonus reward you cannot claim it again.`

        } else {

            text += `*Welcome to our celestic family we are really happy to get you as our member.You have claimed your bonus reward 🎉: ${bonusamount} you can collect a free t6 if u are within the first 50 member.*`

            await client.cradit.add(`${M.sender}.wallet`, bonusamount)

            await client.cradit.set(`${M.sender}.bonus`, Date.now())

        }

        M.reply(text)

    }

}
