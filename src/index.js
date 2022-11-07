import { gameBoard, gameBoardObj } from "./boardBuilder";

const board = new gameBoardObj();
board.placeShip(0, 0, 2);

board.placeShip(1, 1, 2);
board.placeShip(4, 0, 2);
board.placeShip(8, 0, 2);
board.placeShip(7, 3, 2);
board.placeShip(8, 5, 2);
board.placeShip(5, 9, 2);

// console.log(board.boardArr[0][0]);
// console.log(board.boardArr[1][0]);
board.receiveAttack(0, 0);
board.receiveAttack(0, 0);
// console.log(board.boardArr[0][0]);
// console.log(board.boardArr[1][0]);
board.showBoard();
