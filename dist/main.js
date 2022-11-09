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
      // still relies on hitting a ship
      this.hitList.push(this.boardArr[x][y].index);
      if (this.boardArr[x][y].ship !== null) {
        this.hitShip(x, y);
        return true;
      }
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
  constructor(name, state, enemyBoard) {
    this.name = name;
    this.state = state;
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



const board = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj();
const me = new _playerBuilder__WEBPACK_IMPORTED_MODULE_1__.Player("Joe", true, board);
board.placeShip(0, 0, 4);

board.placeShip(1, 1, 2);
board.placeShip(4, 8, 5);
board.placeShip(8, 5, 2);
board.placeShip(7, 3, 3);

console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
me.attack(0, 0);
me.attack(1, 0);
me.attack(0, 0);
console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.showBoard();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0IsYUFBYTtBQUNiLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFDQUFxQyxpREFBTztBQUM1QyxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixtQkFBbUIsR0FBRztBQUN0QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCLFVBQVU7QUFDVixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXdCOzs7Ozs7Ozs7Ozs7Ozs7QUNwSXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLFdBQVc7QUFDdkM7QUFDQSxNQUFNO0FBQ04sNEJBQTRCLFdBQVc7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUNsQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVtQjs7Ozs7OztVQzlCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDTDs7QUFFekMsa0JBQWtCLHVEQUFZO0FBQzlCLGVBQWUsa0RBQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3NoaXBCdWlsZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2hpcE9iaiB9IGZyb20gXCIuL3NoaXBCdWlsZGVyXCI7XG5cbi8vIGNvbnN0IGdhbWVCb2FyZCA9ICgpID0+IHtcbi8vICAgLy8gaW5pdGlhbHplIDEweDEwIGFycmF5XG4vLyAgIGNvbnN0IGJvYXJkQXJyID0gbmV3IEFycmF5KDEwKTtcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4vLyAgICAgYm9hcmRBcnJbaV0gPSBuZXcgQXJyYXkoMTApO1xuLy8gICB9XG5cbi8vICAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHksIGxlbikgPT4ge1xuLy8gICAgIGJvYXJkQXJyW3hdW3ldID0gbmV3IHNoaXBPYmooMik7XG4vLyAgICAgYm9hcmRBcnJbeCArIDFdW3ldID0gYm9hcmRBcnJbeF1beV07XG4vLyAgIH07XG5cbi8vICAgY29uc3Qgc2hvd0JvYXJkID0gKCkgPT4ge1xuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgICAgbGV0IHN0ciA9IGBgO1xuLy8gICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4vLyAgICAgICAgIGlmIChib2FyZEFycltpXVtqXSA9PT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBYYDtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICBzdHIgPSBgJHtzdHJ9IE9gO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgICBjb25zb2xlLmxvZyhzdHIpO1xuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gICByZXR1cm4geyBwbGFjZVNoaXAsIGJvYXJkQXJyLCBzaG93Qm9hcmQgfTtcbi8vIH07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9yZW1vdmVkLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGV2ZXJ5IGFycmF5IGJsb2NrIGNvbnRhaW5zIHRoaXMgb2JqZWN0XG5jbGFzcyBib2FyZEFyck9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKGluZGV4KSB7XG4gICAgdGhpcy5zaGlwID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cbn1cblxuY2xhc3MgZ2FtZUJvYXJkT2JqIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgICB9XG4gICAgdGhpcy5sb2FkQm9hcmRBcnIoKTtcbiAgICB0aGlzLmhpdExpc3QgPSBbXTtcbiAgICB0aGlzLnNoaXBDb3VudCA9IDA7XG4gIH1cblxuICAvLyBpbnNlcnRzIGJvYXJkQXJyT2JqZWN0IGludG8gdGhlIGJvYXJkQXJyXG4gIGxvYWRCb2FyZEFycigpIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRBcnJbaV1bal0gPSBuZXcgYm9hcmRBcnJPYmplY3QoaW5kZXgpO1xuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHBsYWNlcyBzaGlwIGludG8gdGhlIGJvYXJkQXJyIG9iamVjdHNcbiAgcGxhY2VTaGlwKHgsIHksIGxlbikge1xuICAgIGlmICh4ICsgbGVuID4gMTApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2Fubm90IGJlIHBsYWNlZCBoZXJlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAgPSBuZXcgc2hpcE9iaihsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW3ggKyBpXVt5XS5zaGlwID0gdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwO1xuICAgICAgfVxuICAgICAgdGhpcy5zaGlwQ291bnQgKz0gMTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVja3MgaWYgdGhlIHBsYWNlIGhhcyBiZWVuIGhpdFxuICBjaGVja0hpdExpc3QoeCwgeSkge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaGl0TGlzdC5pbmNsdWRlcyh0aGlzLmJvYXJkQXJyW3hdW3ldLmluZGV4KSkge1xuICAgICAgZmxhZyA9IHRydWU7XG4gICAgICByZXR1cm4gZmxhZztcbiAgICB9XG4gICAgcmV0dXJuIGZsYWc7XG4gIH1cblxuICBnYW1lRW5kQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMuc2hpcENvdW50ID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkdhbWUgaGFzIGVuZGVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGhpdFNoaXAoeCwgeSkge1xuICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5oaXQoKTtcbiAgICBpZiAodGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICB0aGlzLnNoaXBDb3VudCAtPSAxO1xuICAgICAgY29uc29sZS5sb2coXCJTaGlwIGhhcyBiZWVuIHN1bmsuXCIpO1xuICAgICAgdGhpcy5nYW1lRW5kQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvLyBoaXRzIHRoZSBib2FyZCBhbmQgbG9ncyB0aGUgaW5kZXggb2YgYm9hcmRBcnIgaW50byBoaXRMaXN0XG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmNoZWNrSGl0TGlzdCh4LCB5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdGlsbCByZWxpZXMgb24gaGl0dGluZyBhIHNoaXBcbiAgICAgIHRoaXMuaGl0TGlzdC5wdXNoKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpO1xuICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhpdFNoaXAoeCwgeSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGxvZ3MgdGhlIGJvYXJkXG4gIHNob3dCb2FyZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGxldCBzdHIgPSBgJHtpfSBgO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkQXJyW2ldW2pdLnNoaXAgPT09IG51bGwpIHtcbiAgICAgICAgICBzdHIgPSBgJHtzdHJ9IC5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVCb2FyZE9iaiB9O1xuIiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgc3RhdGUsIGVuZW15Qm9hcmQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB0aGlzLmVuZW15Qm9hcmQgPSBlbmVteUJvYXJkO1xuICB9XG5cbiAgYXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5lbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm5hbWV9IGhhcyBoaXQgYSBzaGlwLmApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgJHt0aGlzLm5hbWV9IGhhcyBtaXNzZWQgLyBhbHJlYWR5IGhpdCB0aGlzIHNwb3QuYCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiLy8gY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbi8vICAgbGV0IGhpdHMgPSAwO1xuLy8gICBjb25zdCBsZW4gPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGxlbmd0aDtcbi8vICAgfTtcbi8vICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuLy8gICAgIGhpdHMgKz0gMTtcbi8vICAgfTtcbi8vICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuLy8gICAgIHJldHVybiBoaXRzID09PSBsZW5ndGg7XG4vLyAgIH07XG4vLyAgIHJldHVybiB7IGxlbiwgaXNTdW5rLCBoaXQsIGhpdHMgfTtcbi8vIH07XG5cbmNsYXNzIHNoaXBPYmoge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG4gIGxlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgeyBzaGlwT2JqIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVCb2FyZE9iaiB9IGZyb20gXCIuL2JvYXJkQnVpbGRlclwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyQnVpbGRlclwiO1xuXG5jb25zdCBib2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTtcbmNvbnN0IG1lID0gbmV3IFBsYXllcihcIkpvZVwiLCB0cnVlLCBib2FyZCk7XG5ib2FyZC5wbGFjZVNoaXAoMCwgMCwgNCk7XG5cbmJvYXJkLnBsYWNlU2hpcCgxLCAxLCAyKTtcbmJvYXJkLnBsYWNlU2hpcCg0LCA4LCA1KTtcbmJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbmJvYXJkLnBsYWNlU2hpcCg3LCAzLCAzKTtcblxuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xubWUuYXR0YWNrKDAsIDApO1xubWUuYXR0YWNrKDEsIDApO1xubWUuYXR0YWNrKDAsIDApO1xuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2coYm9hcmQuYm9hcmRBcnJbMV1bMF0pO1xuYm9hcmQuc2hvd0JvYXJkKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=