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

  // hits the board and logs the index of boardArr into hitList
  receiveAttack(x, y) {
    if (this.checkHitList(x, y)) {
      console.log("Already been hit.");
      return false;
    } else {
      // still relies on hitting a ship
      this.hitList.push(this.boardArr[x][y].index);
      this.boardArr[x][y].ship.hit();
      if (this.boardArr[x][y].ship.isSunk()) {
        this.shipCount -= 1;
        console.log("Ship has been sunk.");
        this.gameEndCheck();
      }
      return true;
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
      console.log(`Player ${this.name} has missed.`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0IsYUFBYTtBQUNiLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLHFDQUFxQyxpREFBTztBQUM1QyxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsbUJBQW1CLEdBQUc7QUFDdEIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixVQUFVO0FBQ1YsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qjs7Ozs7Ozs7Ozs7Ozs7O0FDOUh4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0EsTUFBTTtBQUNOLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDbEJsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFbUI7Ozs7Ozs7VUM5Qm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0w7O0FBRXpDLGtCQUFrQix1REFBWTtBQUM5QixlQUFlLGtEQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVyQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBPYmogfSBmcm9tIFwiLi9zaGlwQnVpbGRlclwiO1xuXG4vLyBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4vLyAgIC8vIGluaXRpYWx6ZSAxMHgxMCBhcnJheVxuLy8gICBjb25zdCBib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgIGJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbi8vICAgfVxuXG4vLyAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBsZW4pID0+IHtcbi8vICAgICBib2FyZEFyclt4XVt5XSA9IG5ldyBzaGlwT2JqKDIpO1xuLy8gICAgIGJvYXJkQXJyW3ggKyAxXVt5XSA9IGJvYXJkQXJyW3hdW3ldO1xuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IHtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICAgIGxldCBzdHIgPSBgYDtcbi8vICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuLy8gICAgICAgICBpZiAoYm9hcmRBcnJbaV1bal0gPT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gWGA7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgICAgY29uc29sZS5sb2coc3RyKTtcbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHsgcGxhY2VTaGlwLCBib2FyZEFyciwgc2hvd0JvYXJkIH07XG4vLyB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcmVtb3ZlZC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBldmVyeSBhcnJheSBibG9jayBjb250YWlucyB0aGlzIG9iamVjdFxuY2xhc3MgYm9hcmRBcnJPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihpbmRleCkge1xuICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmNsYXNzIGdhbWVCb2FyZE9iaiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4gICAgfVxuICAgIHRoaXMubG9hZEJvYXJkQXJyKCk7XG4gICAgdGhpcy5oaXRMaXN0ID0gW107XG4gICAgdGhpcy5zaGlwQ291bnQgPSAwO1xuICB9XG5cbiAgLy8gaW5zZXJ0cyBib2FyZEFyck9iamVjdCBpbnRvIHRoZSBib2FyZEFyclxuICBsb2FkQm9hcmRBcnIoKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW2ldW2pdID0gbmV3IGJvYXJkQXJyT2JqZWN0KGluZGV4KTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwbGFjZXMgc2hpcCBpbnRvIHRoZSBib2FyZEFyciBvYmplY3RzXG4gIHBsYWNlU2hpcCh4LCB5LCBsZW4pIHtcbiAgICBpZiAoeCArIGxlbiA+IDEwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBiZSBwbGFjZWQgaGVyZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwID0gbmV3IHNoaXBPYmoobGVuKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZEFyclt4ICsgaV1beV0uc2hpcCA9IHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcENvdW50ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHRoZSBwbGFjZSBoYXMgYmVlbiBoaXRcbiAgY2hlY2tIaXRMaXN0KHgsIHkpIHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpdExpc3QuaW5jbHVkZXModGhpcy5ib2FyZEFyclt4XVt5XS5pbmRleCkpIHtcbiAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuICAgIHJldHVybiBmbGFnO1xuICB9XG5cbiAgZ2FtZUVuZENoZWNrKCkge1xuICAgIGlmICh0aGlzLnNoaXBDb3VudCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coXCJHYW1lIGhhcyBlbmRlZFwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBoaXRzIHRoZSBib2FyZCBhbmQgbG9ncyB0aGUgaW5kZXggb2YgYm9hcmRBcnIgaW50byBoaXRMaXN0XG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmNoZWNrSGl0TGlzdCh4LCB5KSkge1xuICAgICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGJlZW4gaGl0LlwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3RpbGwgcmVsaWVzIG9uIGhpdHRpbmcgYSBzaGlwXG4gICAgICB0aGlzLmhpdExpc3QucHVzaCh0aGlzLmJvYXJkQXJyW3hdW3ldLmluZGV4KTtcbiAgICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5oaXQoKTtcbiAgICAgIGlmICh0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgdGhpcy5zaGlwQ291bnQgLT0gMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTaGlwIGhhcyBiZWVuIHN1bmsuXCIpO1xuICAgICAgICB0aGlzLmdhbWVFbmRDaGVjaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gbG9ncyB0aGUgYm9hcmRcbiAgc2hvd0JvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHN0ciA9IGAke2l9IGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbaV1bal0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gLmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUJvYXJkT2JqIH07XG4iLCJjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBzdGF0ZSwgZW5lbXlCb2FyZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuZW5lbXlCb2FyZCA9IGVuZW15Qm9hcmQ7XG4gIH1cblxuICBhdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSkge1xuICAgICAgY29uc29sZS5sb2coYFBsYXllciAke3RoaXMubmFtZX0gaGFzIGhpdCBhIHNoaXAuYCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYFBsYXllciAke3RoaXMubmFtZX0gaGFzIG1pc3NlZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCIvLyBjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuLy8gICBsZXQgaGl0cyA9IDA7XG4vLyAgIGNvbnN0IGxlbiA9ICgpID0+IHtcbi8vICAgICByZXR1cm4gbGVuZ3RoO1xuLy8gICB9O1xuLy8gICBjb25zdCBoaXQgPSAoKSA9PiB7XG4vLyAgICAgaGl0cyArPSAxO1xuLy8gICB9O1xuLy8gICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGhpdHMgPT09IGxlbmd0aDtcbi8vICAgfTtcbi8vICAgcmV0dXJuIHsgbGVuLCBpc1N1bmssIGhpdCwgaGl0cyB9O1xuLy8gfTtcblxuY2xhc3Mgc2hpcE9iaiB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cbiAgbGVuKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCB7IHNoaXBPYmogfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZUJvYXJkT2JqIH0gZnJvbSBcIi4vYm9hcmRCdWlsZGVyXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJCdWlsZGVyXCI7XG5cbmNvbnN0IGJvYXJkID0gbmV3IGdhbWVCb2FyZE9iaigpO1xuY29uc3QgbWUgPSBuZXcgUGxheWVyKFwiSm9lXCIsIHRydWUsIGJvYXJkKTtcbmJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcblxuYm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDQsIDgsIDUpO1xuYm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDcsIDMsIDMpO1xuXG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclsxXVswXSk7XG5tZS5hdHRhY2soMCwgMCk7XG5tZS5hdHRhY2soMSwgMCk7XG5tZS5hdHRhY2soMCwgMCk7XG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclsxXVswXSk7XG5ib2FyZC5zaG93Qm9hcmQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==