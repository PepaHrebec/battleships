import { gameBoardObj } from "./boardBuilder";
import { Player } from "./playerBuilder";
import { buildBoard, connectBoard } from "./game";

const board = new gameBoardObj(); //creates the object
const me = new Player("Joe", board); //creates the player

buildBoard("left-block"); //creates the DOM
connectBoard("left-block", me);

board.placeShip(0, 0, 4);
board.placeShip(1, 1, 2);
board.placeShip(4, 8, 5);
board.placeShip(8, 5, 2);
board.placeShip(7, 3, 3);

console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
// me.attack(0, 0);
// me.attack(1, 0);
// me.attack(0, 0);
// me.aiAttack();
// me.aiAttack();
// me.aiAttack();
// me.aiAttack();

console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.showBoard();
