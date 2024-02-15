module.exports = EventsHandler = async (event, client) => {
    const activateEvents = (await client.DB.get('events')) || [];
    const groupMetadata = await client.groupMetadata(event.id);
    if (!activateEvents.includes(event.id)) return;

    const getRandomMessage = (action, participants) => {
        const randomMessages = {
            add: [
                '{user} has joined the party!',
                'A wild {user} appeared!',
                '{user} hopped into the group!',
                '{user} has arrived!',
                'Welcome to the group, {user}. Hope you brought pizza.',
                "{user} has arrived. Let's have a beer!",
                '{user} has arrived. May I suggest a nice cold one?',
                "Well, {user}, it's about time you arrived!",
                'Um, {user} has arrived. I wonder if they brought their own cup of tea?',
                'Very funny {user}, I expected you to be here a while.',
                'Good to see you, {user}.',
                "It's a pleasure to see you {user}.",
            ],
            remove: [
                '{user} has left the party.',
                '{user} has left the group.',
                '{user} has left the group. I hope you enjoyed your stay.',
                "Well {user}, it's about time you left.",
                'Bye {user}.',
                "It's been nice meeting you {user}.",
                'Take care {user}.',
                'Later {user}.',
                'Catch you later {user}.',
                'Au Revoir {user}.',
                'Till next time {user}.',
                'We will meet again {user}.',
                "I'm looking forward to seeing you {user}.",
                'I hope you brought a souvenir {user}.',
            ],
            demote: [
                "{user}, you're fired!",
                "Adminship isn't for you {user}.",
                "{user} you had a good run, but you're no longer an admin.",
                "Well, I don't know how to tell you this, but {user} has been demoted.",
                '{user} has been demoted. I hope you enjoyed your admin run.',
            ],
            promote: [
                "{user}, you're an admin!",
                "Welcome {user}, you're an admin!",
                "{user} you're an admin! I hope you take care of us",
                "Well, you're an admin now {user}.",
                "Looks like you're an admin now {user}.",
            ],
        };

        const messages = randomMessages[action] || [];
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex].replace('{user}', `@${participants[0].split('@')[0]}`) || '';
    };

    const text = getRandomMessage(event.action, event.participants);

    client.sendMessage(event.id, {
        text,
        mentions: event.participants,
    });
};
                
