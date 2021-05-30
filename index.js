const Discord = require('discord.js');
const client = new Discord.Client();
const sides = 6;

function getRoll() {
  return value = Math.floor((Math.random() * sides) + 1);
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
  console.log('BOT Ready!');
});

client.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const prefix = messageWords[0];
  const rolls = messageWords[1] || 1;
  
  if (prefix === '$sfida') {
    if (rolls > 0) {
      console.log(`Rolling ${rolls} dices`);
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        try {
          const roll = getRoll();
          const converted = getChallengeResult(roll); 
          console.log(`Rolled: ${value} -> Converted: ${converted}`);
          rollResults.push(roll);
        } catch (e) {
          console.error(e);
        }
      }
      return message.reply(`[${rollResults.join(', ').toString()}]`);
    } else {
      return message.reply('Rolls cannot be negative!')
    }
  }
});

client.login(process.env.TOKEN);
