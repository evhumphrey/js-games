const Board = require('./board');
const Reader = require('./reader');

class Game {

  constructor(reader) {
    this.reader = reader;
    this.mark = 'X';
    this.board = new Board();
  }

  gameOver() {
    return this.board.isWon();
  }

  switchMark() {
    if (this.mark === "X") {
      this.mark = "O";
    } else {
      this.mark = "X";
    }
  }

  // play() {
  //   while (!this.gameOver()) {
  //     this.board.render();
  //     const pos = this.currentPlayer.getMove();
  //     this.board.placeMark(pos, this.currentPlayer.mark);
  //     this.switchPlayers();
  //   }
  //
  //   console.log("Game Over!");
  // }


}

Game.prototype.run = function (reader, completionCallback) {
  if (!this.gameOver()) {
    this.board.render();
    reader.question("Enter a position: ", (response) => {
      const pos = response.split(',').map(str => parseInt(str));
      this.board.placeMark(pos, this.mark);
      this.switchMark();
      this.run(reader, completionCallback);
    });
  } else {
    console.log("You win 🎉");
    // reader.close();
    completionCallback();
  }
};

module.exports = Game;

// const g = new Game(Reader);
// g.run(g.reader, () => console.log("CATs"));
