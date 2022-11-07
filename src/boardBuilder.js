import { Ship, shipObj } from "./shipBuilder";

const gameBoard = () => {
  // initialze 10x10 array
  const boardArr = new Array(10);
  for (let i = 0; i < 10; i++) {
    boardArr[i] = new Array(10);
  }

  const placeShip = (x, y, len) => {
    boardArr[x][y] = new shipObj(2);
    boardArr[x + 1][y] = boardArr[x][y];
  };

  const showBoard = () => {
    for (let i = 0; i < 10; i++) {
      let str = ``;
      for (let j = 0; j < 10; j++) {
        if (boardArr[i][j] === undefined) {
          str = `${str} X`;
        } else {
          str = `${str} O`;
        }
      }
      console.log(str);
    }
  };

  return { placeShip, boardArr, showBoard };
};

class gameBoardObj {
  constructor() {
    this.boardArr = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.boardArr[i] = new Array(10);
    }
    this.hitList = [];
  }
  placeShip(x, y, len) {
    this.boardArr[x][y] = new shipObj(2);
    this.boardArr[x + 1][y] = this.boardArr[x][y];
  }

  checkHitList(x, y) {
    let flag = false;
    this.hitList.forEach((entry) => {
      if (entry[0] == x && entry[1] == y) {
        flag = true;
      }
    });
    return flag; /// THIS IS STUPID AAAAAAAAAAAAAAAAAAAA
  }

  receiveAttack(x, y) {
    if (this.checkHitList(x, y)) {
      console.log("Invalid target");
    } else {
      this.hitList.push([x, y]);
      this.boardArr[x][y].hit();
    }
    console.log(this.hitList);
  }

  showBoard() {
    for (let i = 0; i < 10; i++) {
      let str = ``;
      for (let j = 0; j < 10; j++) {
        if (this.boardArr[i][j] === undefined) {
          str = `${str} X`;
        } else {
          str = `${str} O`;
        }
      }
      console.log(str);
    }
  }
}

export { gameBoard, gameBoardObj };
