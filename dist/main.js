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
  if (player.enemyBoard.gameEndCheck()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFbUI7Ozs7Ozs7VUM5Qm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ044QztBQUNMO0FBS2Q7O0FBRTNCLG9CQUFvQix1REFBWSxJQUFJO0FBQ3BDLG9CQUFvQix1REFBWTtBQUNoQyxlQUFlLGtEQUFNLGtCQUFrQjtBQUN2QyxlQUFlLGtEQUFNOztBQUVyQiw0REFBVSxnQkFBZ0I7QUFDMUIsNERBQVU7O0FBRVYsb0VBQWtCLHdCQUF3Qjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdFQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXllckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaGlwT2JqIH0gZnJvbSBcIi4vc2hpcEJ1aWxkZXJcIjtcblxuLy8gY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuLy8gICAvLyBpbml0aWFsemUgMTB4MTAgYXJyYXlcbi8vICAgY29uc3QgYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICBib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIH1cblxuLy8gICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgbGVuKSA9PiB7XG4vLyAgICAgYm9hcmRBcnJbeF1beV0gPSBuZXcgc2hpcE9iaigyKTtcbi8vICAgICBib2FyZEFyclt4ICsgMV1beV0gPSBib2FyZEFyclt4XVt5XTtcbi8vICAgfTtcblxuLy8gICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiB7XG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4vLyAgICAgICBsZXQgc3RyID0gYGA7XG4vLyAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbi8vICAgICAgICAgaWYgKGJvYXJkQXJyW2ldW2pdID09PSB1bmRlZmluZWQpIHtcbi8vICAgICAgICAgICBzdHIgPSBgJHtzdHJ9IFhgO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4vLyAgICAgfVxuLy8gICB9O1xuXG4vLyAgIHJldHVybiB7IHBsYWNlU2hpcCwgYm9hcmRBcnIsIHNob3dCb2FyZCB9O1xuLy8gfTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL3JlbW92ZWQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gZXZlcnkgYXJyYXkgYmxvY2sgY29udGFpbnMgdGhpcyBvYmplY3RcbmNsYXNzIGJvYXJkQXJyT2JqZWN0IHtcbiAgY29uc3RydWN0b3IoaW5kZXgpIHtcbiAgICB0aGlzLnNoaXAgPSBudWxsO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxufVxuXG5jbGFzcyBnYW1lQm9hcmRPYmoge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkQXJyID0gbmV3IEFycmF5KDEwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmRBcnJbaV0gPSBuZXcgQXJyYXkoMTApO1xuICAgIH1cbiAgICB0aGlzLmxvYWRCb2FyZEFycigpO1xuICAgIHRoaXMuaGl0TGlzdCA9IFtdO1xuICAgIHRoaXMuc2hpcENvdW50ID0gMDtcbiAgfVxuXG4gIC8vIGluc2VydHMgYm9hcmRBcnJPYmplY3QgaW50byB0aGUgYm9hcmRBcnJcbiAgbG9hZEJvYXJkQXJyKCkge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZEFycltpXVtqXSA9IG5ldyBib2FyZEFyck9iamVjdChpbmRleCk7XG4gICAgICAgIGluZGV4ICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcGxhY2VzIHNoaXAgaW50byB0aGUgYm9hcmRBcnIgb2JqZWN0c1xuICBwbGFjZVNoaXAoeCwgeSwgbGVuKSB7XG4gICAgaWYgKHggKyBsZW4gPiAxMCkge1xuICAgICAgY29uc29sZS5sb2coXCJDYW5ub3QgYmUgcGxhY2VkIGhlcmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcCA9IG5ldyBzaGlwT2JqKGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRBcnJbeCArIGldW3ldLnNoaXAgPSB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXA7XG4gICAgICB9XG4gICAgICB0aGlzLnNoaXBDb3VudCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiB0aGUgcGxhY2UgaGFzIGJlZW4gaGl0XG4gIGNoZWNrSGl0TGlzdCh4LCB5KSB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5oaXRMaXN0LmluY2x1ZGVzKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpKSB7XG4gICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmbGFnO1xuICAgIH1cbiAgICByZXR1cm4gZmxhZztcbiAgfVxuXG4gIGdhbWVFbmRDaGVjaygpIHtcbiAgICBpZiAodGhpcy5zaGlwQ291bnQgPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGhpdFNoaXAoeCwgeSkge1xuICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5oaXQoKTtcbiAgICBpZiAodGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICB0aGlzLnNoaXBDb3VudCAtPSAxO1xuICAgICAgY29uc29sZS5sb2coXCJTaGlwIGhhcyBiZWVuIHN1bmsuXCIpO1xuICAgICAgdGhpcy5nYW1lRW5kQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvLyBoaXRzIHRoZSBib2FyZCBhbmQgbG9ncyB0aGUgaW5kZXggb2YgYm9hcmRBcnIgaW50byBoaXRMaXN0XG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmNoZWNrSGl0TGlzdCh4LCB5KSkge1xuICAgICAgcmV0dXJuIDI7IC8vY2xpY2tlZCBvbiBhIGhpdCBwbGFjZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpdExpc3QucHVzaCh0aGlzLmJvYXJkQXJyW3hdW3ldLmluZGV4KTtcbiAgICAgIGlmICh0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5oaXRTaGlwKHgsIHkpO1xuICAgICAgICBjb25zb2xlLmxvZyhgU2hpcCBoaXQgYXQgY29vcmRpbmF0ZXMgWyR7eH1dWyR7eX1dYCk7XG4gICAgICAgIHJldHVybiAxOyAvL2hpdCBzaGlwXG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhgU2VhIGhpdCBhdCBjb29yZGluYXRlcyBbJHt4fV1bJHt5fV1gKTtcbiAgICAgIHJldHVybiAwOyAvL2hpdCB3YXRlclxuICAgIH1cbiAgfVxuXG4gIC8vIGxvZ3MgdGhlIGJvYXJkXG4gIHNob3dCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGxldCBzdHIgPSBgJHtpfSBgO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkQXJyW2ldW2pdLnNoaXAgPT09IG51bGwpIHtcbiAgICAgICAgICBzdHIgPSBgJHtzdHJ9IC5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVCb2FyZE9iaiB9O1xuIiwiZnVuY3Rpb24gYnVpbGRCb2FyZChibG9jaykge1xuICBjb25zdCBibG9ja0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2Jsb2NrfWApO1xuICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvYXJkLmNsYXNzTGlzdC5hZGQoXCJib2FyZFwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgc3F1YXJlYCk7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChgJHtibG9ja30tc3F1YXJlYCk7XG4gICAgICBzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWCA9IGo7XG4gICAgICBzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWSA9IGk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuICBibG9ja0Rpdi5hcHBlbmRDaGlsZChib2FyZCk7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFNoaXBzKG1lQmxvY2ssIGVuZW15KSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHttZUJsb2NrfS1zcXVhcmVgKTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBpZiAoXG4gICAgICBlbmVteS5lbmVteUJvYXJkLmJvYXJkQXJyW3NxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVYXVtcbiAgICAgICAgc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVlcbiAgICAgIF0uc2hpcCAhPT0gbnVsbFxuICAgICkge1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoYXNfc2hpcFwiKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBib2FyZEF0dGFjayhzcXVhcmUsIHBsYXllciwgQUkpIHtcbiAgaWYgKHBsYXllci5lbmVteUJvYXJkLmdhbWVFbmRDaGVjaygpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3dpdGNoIChcbiAgICBwbGF5ZXIuYXR0YWNrKHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVYLCBzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWSlcbiAgKSB7XG4gICAgY2FzZSAxOlxuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICBBSS5haUF0dGFjaygpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDA6XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgQUkuYWlBdHRhY2soKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbm5lY3RQbGF5ZXJCb2FyZChlbmVteUJsb2NrLCBwbGF5ZXIsIEFJKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtlbmVteUJsb2NrfS1zcXVhcmVgKTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGJvYXJkQXR0YWNrKHNxdWFyZSwgcGxheWVyLCBBSSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBidWlsZEJvYXJkLCBjb25uZWN0UGxheWVyQm9hcmQsIGhpZ2hsaWdodFNoaXBzIH07XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBlbmVteUJvYXJkKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmVuZW15Qm9hcmQgPSBlbmVteUJvYXJkO1xuICB9XG5cbiAgYXR0YWNrKHgsIHkpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm5hbWV9IGhhcyBoaXQgYSBzaGlwLmApO1xuICAgICAgICByZXR1cm4gMTtcblxuICAgICAgY2FzZSAwOlxuICAgICAgICBjb25zb2xlLmxvZyhgUGxheWVyICR7dGhpcy5uYW1lfSBoYXMgbWlzc2VkYCk7XG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhgUGxhY2UgaGFzIGJlZW4gYWxyZWFkeSBoaXRgKTtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICB9XG5cbiAgYWlBdHRhY2soKSB7XG4gICAgbGV0IHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB3aGlsZSAoXG4gICAgICB0aGlzLmVuZW15Qm9hcmQuaGl0TGlzdC5pbmNsdWRlcyhcbiAgICAgICAgdGhpcy5lbmVteUJvYXJkLmJvYXJkQXJyW3JhbmRYXVtyYW5kWV0uaW5kZXhcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJhbmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfVxuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtY29vcmRpbmF0ZS14PVwiJHtyYW5kWH1cIl1bZGF0YS1jb29yZGluYXRlLXk9XCIke3JhbmRZfVwiXS5yaWdodC1ibG9jay1zcXVhcmVgXG4gICAgKTtcbiAgICBzd2l0Y2ggKHRoaXMuYXR0YWNrKHJhbmRYLCByYW5kWSkpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIndhdGVyXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCIvLyBjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuLy8gICBsZXQgaGl0cyA9IDA7XG4vLyAgIGNvbnN0IGxlbiA9ICgpID0+IHtcbi8vICAgICByZXR1cm4gbGVuZ3RoO1xuLy8gICB9O1xuLy8gICBjb25zdCBoaXQgPSAoKSA9PiB7XG4vLyAgICAgaGl0cyArPSAxO1xuLy8gICB9O1xuLy8gICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGhpdHMgPT09IGxlbmd0aDtcbi8vICAgfTtcbi8vICAgcmV0dXJuIHsgbGVuLCBpc1N1bmssIGhpdCwgaGl0cyB9O1xuLy8gfTtcblxuY2xhc3Mgc2hpcE9iaiB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cbiAgbGVuKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCB7IHNoaXBPYmogfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZUJvYXJkT2JqIH0gZnJvbSBcIi4vYm9hcmRCdWlsZGVyXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJCdWlsZGVyXCI7XG5pbXBvcnQge1xuICBidWlsZEJvYXJkLFxuICBjb25uZWN0UGxheWVyQm9hcmQsXG4gIGhpZ2hsaWdodFNoaXBzLFxufSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcblxuY29uc3QgbXlCb2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTsgLy9jcmVhdGVzIHRoZSBvYmplY3RcbmNvbnN0IGFpQm9hcmQgPSBuZXcgZ2FtZUJvYXJkT2JqKCk7XG5jb25zdCBtZSA9IG5ldyBQbGF5ZXIoXCJKb2VcIiwgbXlCb2FyZCk7IC8vY3JlYXRlcyB0aGUgcGxheWVyXG5jb25zdCBBSSA9IG5ldyBQbGF5ZXIoXCJSb2JvdFwiLCBhaUJvYXJkKTtcblxuYnVpbGRCb2FyZChcImxlZnQtYmxvY2tcIik7IC8vY3JlYXRlcyB0aGUgRE9NXG5idWlsZEJvYXJkKFwicmlnaHQtYmxvY2tcIik7XG5cbmNvbm5lY3RQbGF5ZXJCb2FyZChcImxlZnQtYmxvY2tcIiwgbWUsIEFJKTsgLy9jb25uZWN0cyB0aGUgcGxheWVyIHRvIHRoZSBlbmVteSBib2FyZFxuXG5teUJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcbm15Qm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xubXlCb2FyZC5wbGFjZVNoaXAoNCwgOCwgNSk7XG5teUJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbm15Qm9hcmQucGxhY2VTaGlwKDcsIDMsIDMpO1xuXG5haUJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcbmFpQm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xuYWlCb2FyZC5wbGFjZVNoaXAoNCwgOCwgNSk7XG5haUJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbmFpQm9hcmQucGxhY2VTaGlwKDcsIDMsIDMpO1xuXG5oaWdobGlnaHRTaGlwcyhcInJpZ2h0LWJsb2NrXCIsIEFJKTtcblxuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhteUJvYXJkLmJvYXJkQXJyWzFdWzBdKTtcbi8vIG1lLmF0dGFjaygwLCAwKTtcbi8vIG1lLmF0dGFjaygxLCAwKTtcbi8vIG1lLmF0dGFjaygwLCAwKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG4vLyBtZS5haUF0dGFjaygpO1xuLy8gbWUuYWlBdHRhY2soKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG5cbmNvbnNvbGUubG9nKG15Qm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclsxXVswXSk7XG5teUJvYXJkLnNob3dCb2FyZCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9