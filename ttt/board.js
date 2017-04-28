class Board {
  constructor(){
    this.grid = Board.makeGrid();
  }

  static makeGrid() {
    let grid = new Array(3);
    for(let i = 0; i < 3; i++){
      grid[i] = new Array(3);
    }

    return grid;
  }

  isWon() {
    if (this.getWinner()) {
      return true;
    }

    return false;
  }

  getWinner() {
    let collection = [];
    for(let i = 0; i < 3; i ++) {
      collection.push(this._row(i));
      collection.push(this._col(i));
    }
    collection.push(this._leftDiag());
    collection.push(this._rightDiag());

    for(let i = 0; i < collection.length; i ++){
      let mark = this._isTriple(collection[i]);
      if (mark) {
        return mark;
      }
    }

    return null;
  }

  isEmpty(pos) {
    const [row, col] = pos;
    return (this.grid[row][col] === undefined);
  }

  placeMark(pos, mark){
    const [row, col] = pos;

    if (this.isEmpty(pos)) {
      this.grid[row][col] = mark;
    }
  }

  render() {
    for(let i = 0; i < 3; i ++) {
      console.log(JSON.stringify(this._row(i)));
    }
  }

  _row(i) {
    return this.grid[i];
  }

  _col(j) {
    let col = [];
    for(let i = 0; i < 3; i++) {
      col.push(this.grid[i][j]);
    }

    return col;
  }

  _leftDiag() {
    return [this.grid[0][0], this.grid[1][1],this.grid[2][2]];
  }

  _rightDiag() {
    return [this.grid[0][2], this.grid[1][1],this.grid[2][0]];
  }

  _isTriple(array) {
    const mark = array[0];

    for(let i = 0; i < 3; i++){
      if (array[i] === undefined || array[i] !== mark) {
        return false;
      }
    }

    return mark;
  }
}
