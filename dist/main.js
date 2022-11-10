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
      return false;
    } else {
      this.hitList.push(this.boardArr[x][y].index);
      if (this.boardArr[x][y].ship !== null) {
        this.hitShip(x, y);
        console.log(`Ship hit at coordinates [${x}][${y}]`);
        return true;
      }
      console.log(`Sea hit at coordinates [${x}][${y}]`);
      return false;
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
/* harmony export */   "connectBoard": () => (/* binding */ connectBoard)
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

function connectBoard(block, player) {
  const squares = document.querySelectorAll(`.${block}-square`);
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      player.attack(square.dataset.coordinateX, square.dataset.coordinateY);
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
    if (this.enemyBoard.receiveAttack(x, y)) {
      console.log(`Player ${this.name} has hit a ship.`);
      return true;
    } else {
      console.log(`Player ${this.name} has missed / already hit this spot.`);
      return false;
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
    this.enemyBoard.receiveAttack(randX, randY);
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




const board = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj(); //creates the object
const me = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Joe", board); //creates the player

(0,_game__WEBPACK_IMPORTED_MODULE_2__.buildBoard)("left-block"); //creates the DOM
(0,_game__WEBPACK_IMPORTED_MODULE_2__.connectBoard)("left-block", me);

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0w7QUFDUzs7QUFFbEQsa0JBQWtCLHVEQUFZLElBQUk7QUFDbEMsZUFBZSxrREFBTSxnQkFBZ0I7O0FBRXJDLGlEQUFVLGdCQUFnQjtBQUMxQixtREFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBCdWlsZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2hpcE9iaiB9IGZyb20gXCIuL3NoaXBCdWlsZGVyXCI7XG5cbi8vIGNvbnN0IGdhbWVCb2FyZCA9ICgpID0+IHtcbi8vICAgLy8gaW5pdGlhbHplIDEweDEwIGFycmF5XG4vLyAgIGNvbnN0IGJvYXJkQXJyID0gbmV3IEFycmF5KDEwKTtcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4vLyAgICAgYm9hcmRBcnJbaV0gPSBuZXcgQXJyYXkoMTApO1xuLy8gICB9XG5cbi8vICAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGxlbikgPT4ge1xuLy8gICAgIGJvYXJkQXJyW3hdW3ldID0gbmV3IHNoaXBPYmooMik7XG4vLyAgICAgYm9hcmRBcnJbeCArIDFdW3ldID0gYm9hcmRBcnJbeF1beV07XG4vLyAgIH07XG5cbi8vICAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4ge1xuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgICAgbGV0IHN0ciA9IGBgO1xuLy8gICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4vLyAgICAgICAgIGlmIChib2FyZEFycltpXVtqXSA9PT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBYYDtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBzdHIgPSBgJHtzdHJ9IE9gO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgICBjb25zb2xlLmxvZyhzdHIpO1xuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICByZXR1cm4geyBwbGFjZVNoaXAsIGJvYXJkQXJyLCBzaG93Qm9hcmQgfTtcbi8vIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9yZW1vdmVkLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGV2ZXJ5IGFycmF5IGJsb2NrIGNvbnRhaW5zIHRoaXMgb2JqZWN0XG5jbGFzcyBib2FyZEFyck9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgdGhpcy5zaGlwID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cbn1cblxuY2xhc3MgZ2FtZUJvYXJkT2JqIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkQm9hcmRBcnIoKTtcbiAgICB0aGlzLmhpdExpc3QgPSBbXTtcbiAgICB0aGlzLnNoaXBDb3VudCA9IDA7XG4gIH1cblxuICAvLyBpbnNlcnRzIGJvYXJkQXJyT2JqZWN0IGludG8gdGhlIGJvYXJkQXJyXG4gIGxvYWRCb2FyZEFycigpIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRBcnJbaV1bal0gPSBuZXcgYm9hcmRBcnJPYmplY3QoaW5kZXgpO1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHBsYWNlcyBzaGlwIGludG8gdGhlIGJvYXJkQXJyIG9iamVjdHNcbiAgcGxhY2VTaGlwKHgsIHksIGxlbikge1xuICAgIGlmICh4ICsgbGVuID4gMTApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2Fubm90IGJlIHBsYWNlZCBoZXJlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAgPSBuZXcgc2hpcE9iaihsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW3ggKyBpXVt5XS5zaGlwID0gdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwO1xuICAgICAgfVxuICAgICAgdGhpcy5zaGlwQ291bnQgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVja3MgaWYgdGhlIHBsYWNlIGhhcyBiZWVuIGhpdFxuICBjaGVja0hpdExpc3QoeCwgeSkge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaGl0TGlzdC5pbmNsdWRlcyh0aGlzLmJvYXJkQXJyW3hdW3ldLmluZGV4KSkge1xuICAgICAgZmxhZyA9IHRydWU7XG4gICAgICByZXR1cm4gZmxhZztcbiAgICB9XG4gICAgcmV0dXJuIGZsYWc7XG4gIH1cblxuICBnYW1lRW5kQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuc2hpcENvdW50ID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWUgaGFzIGVuZGVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGhpdFNoaXAoeCwgeSkge1xuICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5oaXQoKTtcbiAgICBpZiAodGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICB0aGlzLnNoaXBDb3VudCAtPSAxO1xuICAgICAgY29uc29sZS5sb2coXCJTaGlwIGhhcyBiZWVuIHN1bmsuXCIpO1xuICAgICAgdGhpcy5nYW1lRW5kQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvLyBoaXRzIHRoZSBib2FyZCBhbmQgbG9ncyB0aGUgaW5kZXggb2YgYm9hcmRBcnIgaW50byBoaXRMaXN0XG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmNoZWNrSGl0TGlzdCh4LCB5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpdExpc3QucHVzaCh0aGlzLmJvYXJkQXJyW3hdW3ldLmluZGV4KTtcbiAgICAgIGlmICh0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5oaXRTaGlwKHgsIHkpO1xuICAgICAgICBjb25zb2xlLmxvZyhgU2hpcCBoaXQgYXQgY29vcmRpbmF0ZXMgWyR7eH1dWyR7eX1dYCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coYFNlYSBoaXQgYXQgY29vcmRpbmF0ZXMgWyR7eH1dWyR7eX1dYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gbG9ncyB0aGUgYm9hcmRcbiAgc2hvd0JvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHN0ciA9IGAke2l9IGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbaV1bal0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gLmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUJvYXJkT2JqIH07XG4iLCJmdW5jdGlvbiBidWlsZEJvYXJkKGJsb2NrKSB7XG4gIGNvbnN0IGJsb2NrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7YmxvY2t9YCk7XG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYm9hcmQuY2xhc3NMaXN0LmFkZChcImJvYXJkXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGBzcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGAke2Jsb2NrfS1zcXVhcmVgKTtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVYID0gajtcbiAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZID0gaTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgIH1cbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG4gIGJsb2NrRGl2LmFwcGVuZENoaWxkKGJvYXJkKTtcbn1cblxuZnVuY3Rpb24gY29ubmVjdEJvYXJkKGJsb2NrLCBwbGF5ZXIpIHtcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2Jsb2NrfS1zcXVhcmVgKTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBsYXllci5hdHRhY2soc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVgsIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGJ1aWxkQm9hcmQsIGNvbm5lY3RCb2FyZCB9O1xuIiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZW5lbXlCb2FyZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5lbmVteUJvYXJkID0gZW5lbXlCb2FyZDtcbiAgfVxuXG4gIGF0dGFjayh4LCB5KSB7XG4gICAgaWYgKHRoaXMuZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgUGxheWVyICR7dGhpcy5uYW1lfSBoYXMgaGl0IGEgc2hpcC5gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgUGxheWVyICR7dGhpcy5uYW1lfSBoYXMgbWlzc2VkIC8gYWxyZWFkeSBoaXQgdGhpcyBzcG90LmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGFpQXR0YWNrKCkge1xuICAgIGxldCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKFxuICAgICAgdGhpcy5lbmVteUJvYXJkLmhpdExpc3QuaW5jbHVkZXMoXG4gICAgICAgIHRoaXMuZW5lbXlCb2FyZC5ib2FyZEFycltyYW5kWF1bcmFuZFldLmluZGV4XG4gICAgICApXG4gICAgKSB7XG4gICAgICByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgICB0aGlzLmVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kWCwgcmFuZFkpO1xuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiLy8gY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbi8vICAgbGV0IGhpdHMgPSAwO1xuLy8gICBjb25zdCBsZW4gPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGxlbmd0aDtcbi8vICAgfTtcbi8vICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuLy8gICAgIGhpdHMgKz0gMTtcbi8vICAgfTtcbi8vICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuLy8gICAgIHJldHVybiBoaXRzID09PSBsZW5ndGg7XG4vLyAgIH07XG4vLyAgIHJldHVybiB7IGxlbiwgaXNTdW5rLCBoaXQsIGhpdHMgfTtcbi8vIH07XG5cbmNsYXNzIHNoaXBPYmoge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG4gIGxlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgeyBzaGlwT2JqIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVCb2FyZE9iaiB9IGZyb20gXCIuL2JvYXJkQnVpbGRlclwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyQnVpbGRlclwiO1xuaW1wb3J0IHsgYnVpbGRCb2FyZCwgY29ubmVjdEJvYXJkIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBib2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTsgLy9jcmVhdGVzIHRoZSBvYmplY3RcbmNvbnN0IG1lID0gbmV3IFBsYXllcihcIkpvZVwiLCBib2FyZCk7IC8vY3JlYXRlcyB0aGUgcGxheWVyXG5cbmJ1aWxkQm9hcmQoXCJsZWZ0LWJsb2NrXCIpOyAvL2NyZWF0ZXMgdGhlIERPTVxuY29ubmVjdEJvYXJkKFwibGVmdC1ibG9ja1wiLCBtZSk7XG5cbmJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcbmJvYXJkLnBsYWNlU2hpcCgxLCAxLCAyKTtcbmJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbmJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbmJvYXJkLnBsYWNlU2hpcCg3LCAzLCAzKTtcblxuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xuLy8gbWUuYXR0YWNrKDAsIDApO1xuLy8gbWUuYXR0YWNrKDEsIDApO1xuLy8gbWUuYXR0YWNrKDAsIDApO1xuLy8gbWUuYWlBdHRhY2soKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG4vLyBtZS5haUF0dGFjaygpO1xuLy8gbWUuYWlBdHRhY2soKTtcblxuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xuYm9hcmQuc2hvd0JvYXJkKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=