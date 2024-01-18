const { SlotMachine, SlotSymbol } = require('slot-machine')

module.exports = {

    name: 'slot',

    aliases: ['bet'],

    category: 'economy',

    react: '✅',

    description: 'Bets the given amount of gold in a slot machine',

    async execute(client, arg, M) {

    const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)

        const economy = (await client.DB.get('economy')) || []
    
    if(!economy.includes(M.from)) return M.reply("*❌ Type .support to get Casino group*")


        const symbols = [

  new SlotSymbol('a', {

    display: '🎱',

    points: 2,

    weight: 40

  }),

  new SlotSymbol('b', {

    display: '🎳',

    points: 4,

    weight: 30

  }),

  new SlotSymbol('c', {

    display: '🎲',

    points: 0,

    weight: 20

  }),

  new SlotSymbol('d', {

    display: '🃏',

    points: 6,

    weight: 10

  })

]

        if (!arg) return M.reply('Please provide the amount')

        const amount = parseInt(arg)

        if (isNaN(amount)) return M.reply('Please provide the amount') 

        if (arg.startsWith('-') || arg.startsWith('+')) return M.reply('Please provide the amount')

        const cradits = (await client.cradit.get(`${M.sender}.wallet`)) || 0

        if (amount > 200000000) return M.reply('🟥 *You cannot slot more than 200000000💵 in slot machine*')

        const machine = new SlotMachine(3, symbols).play()

        const lines = machine.lines.filter((line) => !line.diagonal)

        const points = machine.lines.reduce((total, line) => total + line.points, 0)

        const resultAmount = points <= 0 ? -amount : amount * points

        await client.cradit.add(`${M.sender}.wallet`, resultAmount - resultAmount/2)

        let text = '🎰 *──❮ SLOT MACHINE ❯──* 🎰\n\n'

        text += machine.visualize()

        text += points <= 0 ? `\n\n📉 You lost 💵${amount} dollars` : `\n\n📈 You won 💵${resultAmount} dollars`

        M.reply(text)

    }

}
