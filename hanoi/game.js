const reader = require('./reader');

class Game {
  constructor() {
    this.stacks = [[1,2,3],[],[]];
  }

  promptMove(callback) {
    this._render();
    reader.question("From tower: ", function(from) {
      const startTowerIdx = parseInt(from);
      reader.question("To tower: ", function(to) {
        const endTowerIdx = parseInt(to);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    const fromTower = this.stacks[startTowerIdx];
    const toTower = this.stacks[endTowerIdx];
    if (fromTower.length === 0) {
      return false;
    } else if (toTower.length === 0) {
      return true;
    } else {
      return (fromTower[0] < toTower[0]);
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      const disk = this.stacks[startTowerIdx].shift();
      this.stacks[endTowerIdx].unshift(disk);
      return true;
    }
    return false;
  }

  isWon() {
    return (this.stacks[0].length === 0 &&
       (this.stacks[1].length === 0 || this.stacks[2].length === 0 ));
  }

  _render() {
    console.log(JSON.stringify(this.stacks));
  }
}

// Game.prototype.run = function(completionCallback) {
//   this.promptMove((startTowerIdx, endTowerIdx) => {
//     if (this.move(startTowerIdx, endTowerIdx)) {
//       if (!this.isWon()) {
//         this.run(completionCallback);
//       } else {
//         console.log("You win 🎉");
//         completionCallback();
//       }
//     } else {
//       console.log("Whoops; can't do that 😪");
//     }
//   });


Game.prototype.run = function(completionCallback) {
  if (!this.isWon()) {
    this.promptMove((startTowerIdx, endTowerIdx) => {
      if (this.move(startTowerIdx, endTowerIdx)) {
        this.run(completionCallback);
      } else {
        console.log("Whoops; can't do that 😪");
      }
    });
  } else {
    console.log("You win 🎉");
    completionCallback();
  }
  // until first tower is empty + other tower has three
    // getMove --> get from_tower and to_tower
    // makeMove --> check if valid, move

  // game over, close reader

};

const game = new Game();
game.run(() => reader.close());
