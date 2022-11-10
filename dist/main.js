/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/boardBuilder.js":
/*!*****************************!*\
  !*** ./src/boardBuilder.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoardObj": () => (/* binding */ gameBoardObj)
/* harmony export */ });
/* harmony import */ var _shipBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipBuilder */ "./src/shipBuilder.js");


// const gameBoard = () => {
//   // initialze 10x10 array
//   const boardArr = new Array(10);
//   for (let i = 0; i < 10; i++) {
//     boardArr[i] = new Array(10);
//   }

//   const placeShip = (x, y, len) => {
//     boardArr[x][y] = new shipObj(2);
//     boardArr[x + 1][y] = boardArr[x][y];
//   };

//   const showBoard = () => {
//     for (let i = 0; i < 10; i++) {
//       let str = ``;
//       for (let j = 0; j < 10; j++) {
//         if (boardArr[i][j] === undefined) {
//           str = `${str} X`;
//         } else {
//           str = `${str} O`;
//         }
//       }
//       console.log(str);
//     }
//   };

//   return { placeShip, boardArr, showBoard };
// };

/////////////////////////removed////////////////////////

// every array block contains this object
class boardArrObject {
  constructor(index) {
    this.ship = null;
    this.index = index;
  }
}

class gameBoardObj {
  constructor() {
    this.boardArr = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.boardArr[i] = new Array(10);
    }
    this.loadBoardArr();
    this.hitList = [];
    this.shipCount = 0;
  }

  // inserts boardArrObject into the boardArr
  loadBoardArr() {
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.boardArr[i][j] = new boardArrObject(index);
        index += 1;
      }
    }
  }

  // places ship into the boardArr objects
  placeShip(x, y, len) {
    if (x + len > 10) {
      console.log("Cannot be placed here");
    } else {
      this.boardArr[x][y].ship = new _shipBuilder__WEBPACK_IMPORTED_MODULE_0__.shipObj(len);
      for (let i = 1; i < len; i++) {
        this.boardArr[x + i][y].ship = this.boardArr[x][y].ship;
      }
      this.shipCount += 1;
    }
  }

  // checks if the place has been hit
  checkHitList(x, y) {
    let flag = false;
    if (this.hitList.includes(this.boardArr[x][y].index)) {
      flag = true;
      return flag;
    }
    return flag;
  }

  gameEndCheck() {
    if (this.shipCount === 0) {
      console.log("Game has ended");
    }
  }

  hitShip(x, y) {
    this.boardArr[x][y].ship.hit();
    if (this.boardArr[x][y].ship.isSunk()) {
      this.shipCount -= 1;
      console.log("Ship has been sunk.");
      this.gameEndCheck();
    }
  }

  // hits the board and logs the index of boardArr into hitList
  receiveAttack(x, y) {
    if (this.checkHitList(x, y)) {
      return 2; //clicked on a hit place
    } else {
      this.hitList.push(this.boardArr[x][y].index);
      if (this.boardArr[x][y].ship !== null) {
        this.hitShip(x, y);
        console.log(`Ship hit at coordinates [${x}][${y}]`);
        return 1; //hit ship
      }
      console.log(`Sea hit at coordinates [${x}][${y}]`);
      return 0; //hit water
    }
  }

  // logs the board
  showBoard() {
    for (let i = 0; i < 10; i++) {
      let str = `${i} `;
      for (let j = 0; j < 10; j++) {
        if (this.boardArr[i][j].ship === null) {
          str = `${str} .`;
        } else {
          str = `${str} O`;
        }
      }
      console.log(str);
    }
  }
}




/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildBoard": () => (/* binding */ buildBoard),
/* harmony export */   "connectPlayerBoard": () => (/* binding */ connectPlayerBoard)
/* harmony export */ });
function buildBoard(block) {
  const blockDiv = document.querySelector(`.${block}`);
  const board = document.createElement("div");
  board.classList.add("board");
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const square = document.createElement("div");
      square.classList.add(`square`);
      square.classList.add(`${block}-square`);
      square.dataset.coordinateX = j;
      square.dataset.coordinateY = i;
      row.appendChild(square);
    }
    board.appendChild(row);
  }
  blockDiv.appendChild(board);
}

function connectPlayerBoard(enemyBlock, player, AI) {
  const squares = document.querySelectorAll(`.${enemyBlock}-square`);
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      switch (
        player.attack(square.dataset.coordinateX, square.dataset.coordinateY)
      ) {
        case 1:
          square.style.backgroundColor = "red";
          AI.aiAttack();
          break;

        case 0:
          square.style.backgroundColor = "gray";
          AI.aiAttack();
          break;

        default:
          break;
      }
    });
  });
}




/***/ }),

/***/ "./src/playerBuilder.js":
/*!******************************!*\
  !*** ./src/playerBuilder.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
class Player {
  constructor(name, enemyBoard) {
    this.name = name;
    this.enemyBoard = enemyBoard;
  }

  attack(x, y) {
    switch (this.enemyBoard.receiveAttack(x, y)) {
      case 1:
        console.log(`Player ${this.name} has hit a ship.`);
        return 1;

      case 0:
        console.log(`Player ${this.name} has missed`);
        return 0;

      default:
        console.log(`Place has been already hit`);
        return 2;
    }
  }

  aiAttack() {
    let randX = Math.floor(Math.random() * 10);
    let randY = Math.floor(Math.random() * 10);
    while (
      this.enemyBoard.hitList.includes(
        this.enemyBoard.boardArr[randX][randY].index
      )
    ) {
      randX = Math.floor(Math.random() * 10);
      randY = Math.floor(Math.random() * 10);
    }
    this.attack(randX, randY);
    const square = document.querySelector(
      `[data-coordinate-x="${randX}"][data-coordinate-y="${randY}"].right-block-square`
    );
    square.style.backgroundColor = "grey";
  }
}




/***/ }),

/***/ "./src/shipBuilder.js":
/*!****************************!*\
  !*** ./src/shipBuilder.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipObj": () => (/* binding */ shipObj)
/* harmony export */ });
// const Ship = (length) => {
//   let hits = 0;
//   const len = () => {
//     return length;
//   };
//   const hit = () => {
//     hits += 1;
//   };
//   const isSunk = () => {
//     return hits === length;
//   };
//   return { len, isSunk, hit, hits };
// };

class shipObj {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }
  len() {
    return this.length;
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits === this.length;
  }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _boardBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardBuilder */ "./src/boardBuilder.js");
/* harmony import */ var _playerBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerBuilder */ "./src/playerBuilder.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");




const myBoard = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj(); //creates the object
const aiBoard = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj();
const me = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Joe", myBoard); //creates the player
const AI = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Robot", aiBoard);

(0,_game__WEBPACK_IMPORTED_MODULE_2__.buildBoard)("left-block"); //creates the DOM
(0,_game__WEBPACK_IMPORTED_MODULE_2__.buildBoard)("right-block");

(0,_game__WEBPACK_IMPORTED_MODULE_2__.connectPlayerBoard)("left-block", me, AI); //connects the player to the enemy board

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0IsYUFBYTtBQUNiLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFDQUFxQyxpREFBTztBQUM1QyxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRSxJQUFJLEVBQUU7QUFDeEQsa0JBQWtCO0FBQ2xCO0FBQ0EsNkNBQTZDLEVBQUUsSUFBSSxFQUFFO0FBQ3JELGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixtQkFBbUIsR0FBRztBQUN0QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCLFVBQVU7QUFDVixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXdCOzs7Ozs7Ozs7Ozs7Ozs7O0FDckl4QjtBQUNBLDhDQUE4QyxNQUFNO0FBQ3BEO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQSw4QkFBOEIsTUFBTTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRTBDOzs7Ozs7Ozs7Ozs7Ozs7QUMzQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFdBQVc7QUFDekM7O0FBRUE7QUFDQSw4QkFBOEIsV0FBVztBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE1BQU0sd0JBQXdCLE1BQU07QUFDakU7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUN6Q2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVtQjs7Ozs7OztVQzlCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0w7QUFDZTs7QUFFeEQsb0JBQW9CLHVEQUFZLElBQUk7QUFDcEMsb0JBQW9CLHVEQUFZO0FBQ2hDLGVBQWUsa0RBQU0sa0JBQWtCO0FBQ3ZDLGVBQWUsa0RBQU07O0FBRXJCLGlEQUFVLGdCQUFnQjtBQUMxQixpREFBVTs7QUFFVix5REFBa0Isd0JBQXdCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwT2JqIH0gZnJvbSBcIi4vc2hpcEJ1aWxkZXJcIjtcblxuLy8gY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuLy8gICAvLyBpbml0aWFsemUgMTB4MTAgYXJyYXlcbi8vICAgY29uc3QgYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICBib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIH1cblxuLy8gICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgbGVuKSA9PiB7XG4vLyAgICAgYm9hcmRBcnJbeF1beV0gPSBuZXcgc2hpcE9iaigyKTtcbi8vICAgICBib2FyZEFyclt4ICsgMV1beV0gPSBib2FyZEFyclt4XVt5XTtcbi8vICAgfTtcblxuLy8gICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiB7XG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4vLyAgICAgICBsZXQgc3RyID0gYGA7XG4vLyAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbi8vICAgICAgICAgaWYgKGJvYXJkQXJyW2ldW2pdID09PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgICBzdHIgPSBgJHtzdHJ9IFhgO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4vLyAgICAgfVxuLy8gICB9O1xuXG4vLyAgIHJldHVybiB7IHBsYWNlU2hpcCwgYm9hcmRBcnIsIHNob3dCb2FyZCB9O1xuLy8gfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3JlbW92ZWQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gZXZlcnkgYXJyYXkgYmxvY2sgY29udGFpbnMgdGhpcyBvYmplY3RcbmNsYXNzIGJvYXJkQXJyT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICB0aGlzLnNoaXAgPSBudWxsO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxufVxuXG5jbGFzcyBnYW1lQm9hcmRPYmoge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkQXJyID0gbmV3IEFycmF5KDEwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRBcnJbaV0gPSBuZXcgQXJyYXkoMTApO1xuICAgIH1cbiAgICB0aGlzLmxvYWRCb2FyZEFycigpO1xuICAgIHRoaXMuaGl0TGlzdCA9IFtdO1xuICAgIHRoaXMuc2hpcENvdW50ID0gMDtcbiAgfVxuXG4gIC8vIGluc2VydHMgYm9hcmRBcnJPYmplY3QgaW50byB0aGUgYm9hcmRBcnJcbiAgbG9hZEJvYXJkQXJyKCkge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZEFycltpXVtqXSA9IG5ldyBib2FyZEFyck9iamVjdChpbmRleCk7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcGxhY2VzIHNoaXAgaW50byB0aGUgYm9hcmRBcnIgb2JqZWN0c1xuICBwbGFjZVNoaXAoeCwgeSwgbGVuKSB7XG4gICAgaWYgKHggKyBsZW4gPiAxMCkge1xuICAgICAgY29uc29sZS5sb2coXCJDYW5ub3QgYmUgcGxhY2VkIGhlcmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcCA9IG5ldyBzaGlwT2JqKGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRBcnJbeCArIGldW3ldLnNoaXAgPSB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXA7XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBDb3VudCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiB0aGUgcGxhY2UgaGFzIGJlZW4gaGl0XG4gIGNoZWNrSGl0TGlzdCh4LCB5KSB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5oaXRMaXN0LmluY2x1ZGVzKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpKSB7XG4gICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmbGFnO1xuICAgIH1cbiAgICByZXR1cm4gZmxhZztcbiAgfVxuXG4gIGdhbWVFbmRDaGVjaygpIHtcbiAgICBpZiAodGhpcy5zaGlwQ291bnQgPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBoYXMgZW5kZWRcIik7XG4gICAgfVxuICB9XG5cbiAgaGl0U2hpcCh4LCB5KSB7XG4gICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmhpdCgpO1xuICAgIGlmICh0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHRoaXMuc2hpcENvdW50IC09IDE7XG4gICAgICBjb25zb2xlLmxvZyhcIlNoaXAgaGFzIGJlZW4gc3Vuay5cIik7XG4gICAgICB0aGlzLmdhbWVFbmRDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhpdHMgdGhlIGJvYXJkIGFuZCBsb2dzIHRoZSBpbmRleCBvZiBib2FyZEFyciBpbnRvIGhpdExpc3RcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tIaXRMaXN0KHgsIHkpKSB7XG4gICAgICByZXR1cm4gMjsgLy9jbGlja2VkIG9uIGEgaGl0IHBsYWNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGl0TGlzdC5wdXNoKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpO1xuICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhpdFNoaXAoeCwgeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGlwIGhpdCBhdCBjb29yZGluYXRlcyBbJHt4fV1bJHt5fV1gKTtcbiAgICAgICAgcmV0dXJuIDE7IC8vaGl0IHNoaXBcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGBTZWEgaGl0IGF0IGNvb3JkaW5hdGVzIFske3h9XVske3l9XWApO1xuICAgICAgcmV0dXJuIDA7IC8vaGl0IHdhdGVyXG4gICAgfVxuICB9XG5cbiAgLy8gbG9ncyB0aGUgYm9hcmRcbiAgc2hvd0JvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHN0ciA9IGAke2l9IGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbaV1bal0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gLmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUJvYXJkT2JqIH07XG4iLCJmdW5jdGlvbiBidWlsZEJvYXJkKGJsb2NrKSB7XG4gIGNvbnN0IGJsb2NrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7YmxvY2t9YCk7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2Jsb2NrfS1zcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVYID0gajtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZID0gaTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIGJsb2NrRGl2LmFwcGVuZENoaWxkKGJvYXJkKTtcbn1cblxuZnVuY3Rpb24gY29ubmVjdFBsYXllckJvYXJkKGVuZW15QmxvY2ssIHBsYXllciwgQUkpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2VuZW15QmxvY2t9LXNxdWFyZWApO1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgc3dpdGNoIChcbiAgICAgICAgcGxheWVyLmF0dGFjayhzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWCwgc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVkpXG4gICAgICApIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICAgIEFJLmFpQXR0YWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICBBSS5haUF0dGFjaygpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBidWlsZEJvYXJkLCBjb25uZWN0UGxheWVyQm9hcmQgfTtcbiIsImNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGVuZW15Qm9hcmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZW5lbXlCb2FyZCA9IGVuZW15Qm9hcmQ7XG4gIH1cblxuICBhdHRhY2soeCwgeSkge1xuICAgIHN3aXRjaCAodGhpcy5lbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllciAke3RoaXMubmFtZX0gaGFzIGhpdCBhIHNoaXAuYCk7XG4gICAgICAgIHJldHVybiAxO1xuXG4gICAgICBjYXNlIDA6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm5hbWV9IGhhcyBtaXNzZWRgKTtcbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGFjZSBoYXMgYmVlbiBhbHJlYWR5IGhpdGApO1xuICAgICAgICByZXR1cm4gMjtcbiAgICB9XG4gIH1cblxuICBhaUF0dGFjaygpIHtcbiAgICBsZXQgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHdoaWxlIChcbiAgICAgIHRoaXMuZW5lbXlCb2FyZC5oaXRMaXN0LmluY2x1ZGVzKFxuICAgICAgICB0aGlzLmVuZW15Qm9hcmQuYm9hcmRBcnJbcmFuZFhdW3JhbmRZXS5pbmRleFxuICAgICAgKVxuICAgICkge1xuICAgICAgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG4gICAgdGhpcy5hdHRhY2socmFuZFgsIHJhbmRZKTtcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvb3JkaW5hdGUteD1cIiR7cmFuZFh9XCJdW2RhdGEtY29vcmRpbmF0ZS15PVwiJHtyYW5kWX1cIl0ucmlnaHQtYmxvY2stc3F1YXJlYFxuICAgICk7XG4gICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiLy8gY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbi8vICAgbGV0IGhpdHMgPSAwO1xuLy8gICBjb25zdCBsZW4gPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGxlbmd0aDtcbi8vICAgfTtcbi8vICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuLy8gICAgIGhpdHMgKz0gMTtcbi8vICAgfTtcbi8vICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuLy8gICAgIHJldHVybiBoaXRzID09PSBsZW5ndGg7XG4vLyAgIH07XG4vLyAgIHJldHVybiB7IGxlbiwgaXNTdW5rLCBoaXQsIGhpdHMgfTtcbi8vIH07XG5cbmNsYXNzIHNoaXBPYmoge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG4gIGxlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgeyBzaGlwT2JqIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVCb2FyZE9iaiB9IGZyb20gXCIuL2JvYXJkQnVpbGRlclwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyQnVpbGRlclwiO1xuaW1wb3J0IHsgYnVpbGRCb2FyZCwgY29ubmVjdFBsYXllckJvYXJkIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBteUJvYXJkID0gbmV3IGdhbWVCb2FyZE9iaigpOyAvL2NyZWF0ZXMgdGhlIG9iamVjdFxuY29uc3QgYWlCb2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTtcbmNvbnN0IG1lID0gbmV3IFBsYXllcihcIkpvZVwiLCBteUJvYXJkKTsgLy9jcmVhdGVzIHRoZSBwbGF5ZXJcbmNvbnN0IEFJID0gbmV3IFBsYXllcihcIlJvYm90XCIsIGFpQm9hcmQpO1xuXG5idWlsZEJvYXJkKFwibGVmdC1ibG9ja1wiKTsgLy9jcmVhdGVzIHRoZSBET01cbmJ1aWxkQm9hcmQoXCJyaWdodC1ibG9ja1wiKTtcblxuY29ubmVjdFBsYXllckJvYXJkKFwibGVmdC1ibG9ja1wiLCBtZSwgQUkpOyAvL2Nvbm5lY3RzIHRoZSBwbGF5ZXIgdG8gdGhlIGVuZW15IGJvYXJkXG5cbm15Qm9hcmQucGxhY2VTaGlwKDAsIDAsIDQpO1xubXlCb2FyZC5wbGFjZVNoaXAoMSwgMSwgMik7XG5teUJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbm15Qm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xubXlCb2FyZC5wbGFjZVNoaXAoNywgMywgMyk7XG5cbmFpQm9hcmQucGxhY2VTaGlwKDAsIDAsIDQpO1xuYWlCb2FyZC5wbGFjZVNoaXAoMSwgMSwgMik7XG5haUJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbmFpQm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xuYWlCb2FyZC5wbGFjZVNoaXAoNywgMywgMyk7XG5cbmNvbnNvbGUubG9nKG15Qm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclsxXVswXSk7XG4vLyBtZS5hdHRhY2soMCwgMCk7XG4vLyBtZS5hdHRhY2soMSwgMCk7XG4vLyBtZS5hdHRhY2soMCwgMCk7XG4vLyBtZS5haUF0dGFjaygpO1xuLy8gbWUuYWlBdHRhY2soKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG4vLyBtZS5haUF0dGFjaygpO1xuXG5jb25zb2xlLmxvZyhteUJvYXJkLmJvYXJkQXJyWzBdWzBdKTtcbmNvbnNvbGUubG9nKG15Qm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xubXlCb2FyZC5zaG93Qm9hcmQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==