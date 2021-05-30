const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const rollFlavor = messageWords.slice(2).join(' ');
  
  if (messageWords[0] === '!roll') {
    if (messageWords.length === 1) {
      // !roll
      return message.reply(
        (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
      );
    }

    let sides = messageWords[1]; // !roll 20
    let rolls = 1;
    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {
      // !roll 4d20
      rolls = messageWords[1].split('d')[0] / 1;
      sides = messageWords[1].split('d')[1];
    } else if (messageWords[1][0] == 'd') {
      // !roll d20
      sides = sides.slice(1);
    }
    sides = sides / 1; // convert to number
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    if (rolls > 1) {
      const rollResults = [];
      for (let i = 0; i < rolls; i++) {
        rollResults.push(Math.floor(Math.random()*sides)+1);
      }
      const sum = rollResults.reduce((a,b) => a + b);
      return message.reply(`[${rollResults.toString()}] ${rollFlavor}`);
    } else {
      return message.reply(
        (Math.floor(Math.random() * sides) + 1) + ' ' + rollFlavor
      );
    }
  }

  if (messageWords[0] === '$sfida') {
    const value = Math.floor(Math.random() * 6) + 1;
    console.log("Rolled:", value);
    let converted;
    switch (value) {
      case 1:
        converted = 1;
        break;
      case 2:
        converted = 2;
        break;
      case 3:
        converted = 0;
        break;
      case 4:
        converted = 0;
        break;
      case 5:
        converted = 'Effect';
        break;
      case 6:
        converted = 'Effect';
        break;
      default:
        throw 'Error!';
    }
    return message.reply(converted);
  }
});

client.login(process.env.TOKEN);
