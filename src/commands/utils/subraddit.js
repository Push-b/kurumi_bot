const RedditImageFetcher = require("reddit-image-fetcher");
module.exports = {
    name: 'subreddit',
    aliases: ['sr'],
    category: 'utils',
    cool: 10,
    react: "✅",
    description: 'Sends an image of a random waifu',
    async execute(client, arg, M) {
             
   const archer = (await client.DB.get('archer')) || []
   if (!archer.includes(M.from)) return M.reply(` *🟥 Bot is not enabled in current group ask mods to activate* `)
        
       if (!arg) return M.reply('Sorry you did not give any search term!')
        const nsfw = (await client.DB.get('nsfw')) || []
        if(nsfw.includes(`${M.from}`)) {
            RedditImageFetcher.fetch({
                        type: 'custom',
                        total: 1, 
                        addSubreddit:arg,
                        allowNSFW: true,
                    }).then(result => {
                        let akusingle = result[0]
                        client.sendMessage(M.from,{image:{url:akusingle.image}},{quoted:M})
                    })
                    .catch(err => {
                         client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n${err}`})
                    })
                }else{
            
            RedditImageFetcher.fetch({
                        type: 'custom',
                        total: 1, 
                        addSubreddit:arg,
                        allowNSFW: false,
                    }).then(result => {
                        let akusingle = result[0]
                        client.sendMessage(M.from,{image:{url:akusingle.image}},{quoted:M})
                    })
                    .catch(err)(
                        await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n${err}`})
                    )
                    
                }
    }
}
