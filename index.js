const Discord = require('discord.js');
const client = new Discord.Client();
const sides = 6;

function getRoll() {
  let value = Math.floor(Math.random() * sides) + 1;
  console.log("Rolled:", value);
  return value;
}

function getChallengeResult(value) {
  switch (value) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 0;
    case 4:
      return 0;
    case 5:
      return 'Effect';
    case 6:
      return 'Effect';
    default:
      throw 'Error!';
  }
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const prefix = messageWords[0];
  const rolls = messageWords[1] | 1;
  
  if (prefix === '$sfida') {
    if (rolls > 0) {
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        rollResults.push(getChallengeResult(getRoll()));
      }
      return message.reply(`[${rollResults.join(', ').toString()}]`);
    } else {
      return message.reply('Rolls cannot be negative!')
    }
  }
});

client.login(process.env.TOKEN);
