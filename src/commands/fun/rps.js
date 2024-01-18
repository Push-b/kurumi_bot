

module.exports = {
 name: 'rps',
 aliases: ['rps'],
 category: 'fun',
 description: 'Play a game of Rock Paper Scissors against the bot',
 react: "✅",
 execute(client, arg, M) {
  
   const choices = ['rock', 'paper', 'scissors'];
   const playerChoice = arg.toLowerCase();
   const botChoice = choices[Math.floor(Math.random() * choices.length)];

   if (!playerChoice) {
     return M.reply('Please provide your choice (rock, paper, or scissors).');
   }

   if (!choices.includes(playerChoice)) {
     return M.reply('Please provide a valid choice (rock, paper, or scissors).');
   }

   let result = '';

   if (playerChoice === botChoice) {
     result = 'It\'s a draw!';
   } else if (
     (playerChoice === 'rock' && botChoice === 'scissors') ||
     (playerChoice === 'paper' && botChoice === 'rock') ||
     (playerChoice === 'scissors' && botChoice === 'paper')
   ) {
     result = 'You win!';
   } else {
     result = 'You lose!';
   }

   M.reply(`You chose ${playerChoice}, I chose ${botChoice}. ${result}`);
 }
};
