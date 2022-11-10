import { gameBoardObj } from "./boardBuilder";
import { Player } from "./playerBuilder";
import { buildBoard, connectPlayerBoard } from "./game";

const myBoard = new gameBoardObj(); //creates the object
const aiBoard = new gameBoardObj();
const me = new Player("Joe", myBoard); //creates the player
const AI = new Player("Robot", aiBoard);

buildBoard("left-block"); //creates the DOM
buildBoard("right-block");

connectPlayerBoard("left-block", me, AI); //connects the player to the enemy board

myBoard.placeShip(0, 0, 4);
myBoard.placeShip(1, 1, 2);
myBoard.placeShip(4, 8, 5);
myBoard.placeShip(8, 5, 2);
myBoard.placeShip(7, 3, 3);

aiBoard.placeShip(0, 0, 4);
aiBoard.placeShip(1, 1, 2);
aiBoard.placeShip(4, 8, 5);
aiBoard.placeShip(8, 5, 2);
aiBoard.placeShip(7, 3, 3);

console.log(myBoard.boardArr[0][0]);
console.log(myBoard.boardArr[1][0]);
// me.attack(0, 0);
// me.attack(1, 0);
// me.attack(0, 0);
// me.aiAttack();
// me.aiAttack();
// me.aiAttack();
// me.aiAttack();

console.log(myBoard.boardArr[0][0]);
console.log(myBoard.boardArr[1][0]);
myBoard.showBoard();
