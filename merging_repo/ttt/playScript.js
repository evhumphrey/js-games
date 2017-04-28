const reader = require('./reader');
const Game = require('./game');

const playAgain = () => {
  // want to play again?
  reader.question("Want to play again? ", function(res) {
    if (res === 'yes') {
      new Game(reader).run(reader, playAgain);
    } else {
      console.log("Thanks for play 🤡");
      reader.close();
    }
  });
};

const g = new Game(reader);
g.run(g.reader, playAgain);
