import { gameBoardObj } from "./boardBuilder";

const board = new gameBoardObj();
board.placeShip(0, 0, 4);

board.placeShip(1, 1, 2);
board.placeShip(4, 8, 5);
board.placeShip(8, 5, 2);
board.placeShip(7, 3, 3);

console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.receiveAttack(0, 0);
board.receiveAttack(1, 0);
console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.showBoard();
