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
      return true;
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

/***/ "./src/domManipulation.js":
/*!********************************!*\
  !*** ./src/domManipulation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildBoard": () => (/* binding */ buildBoard),
/* harmony export */   "connectPlayerBoard": () => (/* binding */ connectPlayerBoard),
/* harmony export */   "highlightShips": () => (/* binding */ highlightShips)
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

function highlightShips(meBlock, enemy) {
  const squares = document.querySelectorAll(`.${meBlock}-square`);
  squares.forEach((square) => {
    if (
      enemy.enemyBoard.boardArr[square.dataset.coordinateX][
        square.dataset.coordinateY
      ].ship !== null
    ) {
      square.classList.add("has_ship");
    }
  });
}

function boardAttack(square, player, AI) {
  if (
    player.enemyBoard.gameEndCheck()
    // &&
    // document.querySelector("#victory_div") == null
  ) {
    return true;
  }
  switch (
    player.attack(square.dataset.coordinateX, square.dataset.coordinateY)
  ) {
    case 1:
      square.classList.add("hit");
      AI.aiAttack();
      break;

    case 0:
      square.classList.add("water");
      AI.aiAttack();
      break;

    default:
      break;
  }
}

function connectPlayerBoard(enemyBlock, player, AI) {
  const squares = document.querySelectorAll(`.${enemyBlock}-square`);
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      boardAttack(square, player, AI);
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
    const square = document.querySelector(
      `[data-coordinate-x="${randX}"][data-coordinate-y="${randY}"].right-block-square`
    );
    switch (this.attack(randX, randY)) {
      case 1:
        square.classList.add("hit");
        break;

      default:
        square.classList.add("water");
        break;
    }
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
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domManipulation */ "./src/domManipulation.js");




const myBoard = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj(); //creates the object
const aiBoard = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj();
const me = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Joe", myBoard); //creates the player
const AI = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Robot", aiBoard);

(0,_domManipulation__WEBPACK_IMPORTED_MODULE_2__.buildBoard)("left-block"); //creates the DOM
(0,_domManipulation__WEBPACK_IMPORTED_MODULE_2__.buildBoard)("right-block");

(0,_domManipulation__WEBPACK_IMPORTED_MODULE_2__.connectPlayerBoard)("left-block", me, AI); //connects the player to the enemy board

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

(0,_domManipulation__WEBPACK_IMPORTED_MODULE_2__.highlightShips)("right-block", AI);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0IsYUFBYTtBQUNiLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFDQUFxQyxpREFBTztBQUM1QyxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRSxJQUFJLEVBQUU7QUFDeEQsa0JBQWtCO0FBQ2xCO0FBQ0EsNkNBQTZDLEVBQUUsSUFBSSxFQUFFO0FBQ3JELGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixtQkFBbUIsR0FBRztBQUN0QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCLFVBQVU7QUFDVixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJeEI7QUFDQSw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsOEJBQThCLE1BQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRCxRQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdELFdBQVc7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFMEQ7Ozs7Ozs7Ozs7Ozs7OztBQ25FMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVztBQUN6Qzs7QUFFQTtBQUNBLDhCQUE4QixXQUFXO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE1BQU0sd0JBQXdCLE1BQU07QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUNoRGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVtQjs7Ozs7OztVQzlCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0w7QUFLZDs7QUFFM0Isb0JBQW9CLHVEQUFZLElBQUk7QUFDcEMsb0JBQW9CLHVEQUFZO0FBQ2hDLGVBQWUsa0RBQU0sa0JBQWtCO0FBQ3ZDLGVBQWUsa0RBQU07O0FBRXJCLDREQUFVLGdCQUFnQjtBQUMxQiw0REFBVTs7QUFFVixvRUFBa0Isd0JBQXdCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVyQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBPYmogfSBmcm9tIFwiLi9zaGlwQnVpbGRlclwiO1xuXG4vLyBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4vLyAgIC8vIGluaXRpYWx6ZSAxMHgxMCBhcnJheVxuLy8gICBjb25zdCBib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgIGJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbi8vICAgfVxuXG4vLyAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBsZW4pID0+IHtcbi8vICAgICBib2FyZEFyclt4XVt5XSA9IG5ldyBzaGlwT2JqKDIpO1xuLy8gICAgIGJvYXJkQXJyW3ggKyAxXVt5XSA9IGJvYXJkQXJyW3hdW3ldO1xuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IHtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICAgIGxldCBzdHIgPSBgYDtcbi8vICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuLy8gICAgICAgICBpZiAoYm9hcmRBcnJbaV1bal0gPT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gWGA7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgICAgY29uc29sZS5sb2coc3RyKTtcbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHsgcGxhY2VTaGlwLCBib2FyZEFyciwgc2hvd0JvYXJkIH07XG4vLyB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcmVtb3ZlZC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBldmVyeSBhcnJheSBibG9jayBjb250YWlucyB0aGlzIG9iamVjdFxuY2xhc3MgYm9hcmRBcnJPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihpbmRleCkge1xuICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmNsYXNzIGdhbWVCb2FyZE9iaiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4gICAgfVxuICAgIHRoaXMubG9hZEJvYXJkQXJyKCk7XG4gICAgdGhpcy5oaXRMaXN0ID0gW107XG4gICAgdGhpcy5zaGlwQ291bnQgPSAwO1xuICB9XG5cbiAgLy8gaW5zZXJ0cyBib2FyZEFyck9iamVjdCBpbnRvIHRoZSBib2FyZEFyclxuICBsb2FkQm9hcmRBcnIoKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW2ldW2pdID0gbmV3IGJvYXJkQXJyT2JqZWN0KGluZGV4KTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwbGFjZXMgc2hpcCBpbnRvIHRoZSBib2FyZEFyciBvYmplY3RzXG4gIHBsYWNlU2hpcCh4LCB5LCBsZW4pIHtcbiAgICBpZiAoeCArIGxlbiA+IDEwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBiZSBwbGFjZWQgaGVyZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwID0gbmV3IHNoaXBPYmoobGVuKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZEFyclt4ICsgaV1beV0uc2hpcCA9IHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcENvdW50ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHRoZSBwbGFjZSBoYXMgYmVlbiBoaXRcbiAgY2hlY2tIaXRMaXN0KHgsIHkpIHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpdExpc3QuaW5jbHVkZXModGhpcy5ib2FyZEFyclt4XVt5XS5pbmRleCkpIHtcbiAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuICAgIHJldHVybiBmbGFnO1xuICB9XG5cbiAgZ2FtZUVuZENoZWNrKCkge1xuICAgIGlmICh0aGlzLnNoaXBDb3VudCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaGl0U2hpcCh4LCB5KSB7XG4gICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmhpdCgpO1xuICAgIGlmICh0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHRoaXMuc2hpcENvdW50IC09IDE7XG4gICAgICBjb25zb2xlLmxvZyhcIlNoaXAgaGFzIGJlZW4gc3Vuay5cIik7XG4gICAgICB0aGlzLmdhbWVFbmRDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhpdHMgdGhlIGJvYXJkIGFuZCBsb2dzIHRoZSBpbmRleCBvZiBib2FyZEFyciBpbnRvIGhpdExpc3RcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuY2hlY2tIaXRMaXN0KHgsIHkpKSB7XG4gICAgICByZXR1cm4gMjsgLy9jbGlja2VkIG9uIGEgaGl0IHBsYWNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGl0TGlzdC5wdXNoKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpO1xuICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhpdFNoaXAoeCwgeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGlwIGhpdCBhdCBjb29yZGluYXRlcyBbJHt4fV1bJHt5fV1gKTtcbiAgICAgICAgcmV0dXJuIDE7IC8vaGl0IHNoaXBcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGBTZWEgaGl0IGF0IGNvb3JkaW5hdGVzIFske3h9XVske3l9XWApO1xuICAgICAgcmV0dXJuIDA7IC8vaGl0IHdhdGVyXG4gICAgfVxuICB9XG5cbiAgLy8gbG9ncyB0aGUgYm9hcmRcbiAgc2hvd0JvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHN0ciA9IGAke2l9IGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbaV1bal0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gLmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUJvYXJkT2JqIH07XG4iLCJmdW5jdGlvbiBidWlsZEJvYXJkKGJsb2NrKSB7XG4gIGNvbnN0IGJsb2NrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7YmxvY2t9YCk7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2Jsb2NrfS1zcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVYID0gajtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZID0gaTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIGJsb2NrRGl2LmFwcGVuZENoaWxkKGJvYXJkKTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0U2hpcHMobWVCbG9jaywgZW5lbXkpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke21lQmxvY2t9LXNxdWFyZWApO1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIGlmIChcbiAgICAgIGVuZW15LmVuZW15Qm9hcmQuYm9hcmRBcnJbc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVhdW1xuICAgICAgICBzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWVxuICAgICAgXS5zaGlwICE9PSBudWxsXG4gICAgKSB7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhhc19zaGlwXCIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJvYXJkQXR0YWNrKHNxdWFyZSwgcGxheWVyLCBBSSkge1xuICBpZiAoXG4gICAgcGxheWVyLmVuZW15Qm9hcmQuZ2FtZUVuZENoZWNrKClcbiAgICAvLyAmJlxuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmljdG9yeV9kaXZcIikgPT0gbnVsbFxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzd2l0Y2ggKFxuICAgIHBsYXllci5hdHRhY2soc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVgsIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZKVxuICApIHtcbiAgICBjYXNlIDE6XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgIEFJLmFpQXR0YWNrKCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMDpcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwid2F0ZXJcIik7XG4gICAgICBBSS5haUF0dGFjaygpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29ubmVjdFBsYXllckJvYXJkKGVuZW15QmxvY2ssIHBsYXllciwgQUkpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2VuZW15QmxvY2t9LXNxdWFyZWApO1xuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYm9hcmRBdHRhY2soc3F1YXJlLCBwbGF5ZXIsIEFJKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGJ1aWxkQm9hcmQsIGNvbm5lY3RQbGF5ZXJCb2FyZCwgaGlnaGxpZ2h0U2hpcHMgfTtcbiIsImNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGVuZW15Qm9hcmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZW5lbXlCb2FyZCA9IGVuZW15Qm9hcmQ7XG4gIH1cblxuICBhdHRhY2soeCwgeSkge1xuICAgIHN3aXRjaCAodGhpcy5lbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllciAke3RoaXMubmFtZX0gaGFzIGhpdCBhIHNoaXAuYCk7XG4gICAgICAgIHJldHVybiAxO1xuXG4gICAgICBjYXNlIDA6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm5hbWV9IGhhcyBtaXNzZWRgKTtcbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGFjZSBoYXMgYmVlbiBhbHJlYWR5IGhpdGApO1xuICAgICAgICByZXR1cm4gMjtcbiAgICB9XG4gIH1cblxuICBhaUF0dGFjaygpIHtcbiAgICBsZXQgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgbGV0IHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHdoaWxlIChcbiAgICAgIHRoaXMuZW5lbXlCb2FyZC5oaXRMaXN0LmluY2x1ZGVzKFxuICAgICAgICB0aGlzLmVuZW15Qm9hcmQuYm9hcmRBcnJbcmFuZFhdW3JhbmRZXS5pbmRleFxuICAgICAgKVxuICAgICkge1xuICAgICAgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG4gICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1jb29yZGluYXRlLXg9XCIke3JhbmRYfVwiXVtkYXRhLWNvb3JkaW5hdGUteT1cIiR7cmFuZFl9XCJdLnJpZ2h0LWJsb2NrLXNxdWFyZWBcbiAgICApO1xuICAgIHN3aXRjaCAodGhpcy5hdHRhY2socmFuZFgsIHJhbmRZKSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwid2F0ZXJcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsIi8vIGNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4vLyAgIGxldCBoaXRzID0gMDtcbi8vICAgY29uc3QgbGVuID0gKCkgPT4ge1xuLy8gICAgIHJldHVybiBsZW5ndGg7XG4vLyAgIH07XG4vLyAgIGNvbnN0IGhpdCA9ICgpID0+IHtcbi8vICAgICBoaXRzICs9IDE7XG4vLyAgIH07XG4vLyAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbi8vICAgICByZXR1cm4gaGl0cyA9PT0gbGVuZ3RoO1xuLy8gICB9O1xuLy8gICByZXR1cm4geyBsZW4sIGlzU3VuaywgaGl0LCBoaXRzIH07XG4vLyB9O1xuXG5jbGFzcyBzaGlwT2JqIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuICBsZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IHsgc2hpcE9iaiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lQm9hcmRPYmogfSBmcm9tIFwiLi9ib2FyZEJ1aWxkZXJcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllckJ1aWxkZXJcIjtcbmltcG9ydCB7XG4gIGJ1aWxkQm9hcmQsXG4gIGNvbm5lY3RQbGF5ZXJCb2FyZCxcbiAgaGlnaGxpZ2h0U2hpcHMsXG59IGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvblwiO1xuXG5jb25zdCBteUJvYXJkID0gbmV3IGdhbWVCb2FyZE9iaigpOyAvL2NyZWF0ZXMgdGhlIG9iamVjdFxuY29uc3QgYWlCb2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTtcbmNvbnN0IG1lID0gbmV3IFBsYXllcihcIkpvZVwiLCBteUJvYXJkKTsgLy9jcmVhdGVzIHRoZSBwbGF5ZXJcbmNvbnN0IEFJID0gbmV3IFBsYXllcihcIlJvYm90XCIsIGFpQm9hcmQpO1xuXG5idWlsZEJvYXJkKFwibGVmdC1ibG9ja1wiKTsgLy9jcmVhdGVzIHRoZSBET01cbmJ1aWxkQm9hcmQoXCJyaWdodC1ibG9ja1wiKTtcblxuY29ubmVjdFBsYXllckJvYXJkKFwibGVmdC1ibG9ja1wiLCBtZSwgQUkpOyAvL2Nvbm5lY3RzIHRoZSBwbGF5ZXIgdG8gdGhlIGVuZW15IGJvYXJkXG5cbm15Qm9hcmQucGxhY2VTaGlwKDAsIDAsIDQpO1xubXlCb2FyZC5wbGFjZVNoaXAoMSwgMSwgMik7XG5teUJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbm15Qm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xubXlCb2FyZC5wbGFjZVNoaXAoNywgMywgMyk7XG5cbmFpQm9hcmQucGxhY2VTaGlwKDAsIDAsIDQpO1xuYWlCb2FyZC5wbGFjZVNoaXAoMSwgMSwgMik7XG5haUJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbmFpQm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xuYWlCb2FyZC5wbGFjZVNoaXAoNywgMywgMyk7XG5cbmhpZ2hsaWdodFNoaXBzKFwicmlnaHQtYmxvY2tcIiwgQUkpO1xuXG5jb25zb2xlLmxvZyhteUJvYXJkLmJvYXJkQXJyWzBdWzBdKTtcbmNvbnNvbGUubG9nKG15Qm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xuLy8gbWUuYXR0YWNrKDAsIDApO1xuLy8gbWUuYXR0YWNrKDEsIDApO1xuLy8gbWUuYXR0YWNrKDAsIDApO1xuLy8gbWUuYWlBdHRhY2soKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG4vLyBtZS5haUF0dGFjaygpO1xuLy8gbWUuYWlBdHRhY2soKTtcblxuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhteUJvYXJkLmJvYXJkQXJyWzFdWzBdKTtcbm15Qm9hcmQuc2hvd0JvYXJkKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=