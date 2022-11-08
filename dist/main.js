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
    this.shipCount = 5;
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
    this.boardArr[x][y].ship = new _shipBuilder__WEBPACK_IMPORTED_MODULE_0__.shipObj(2);
    this.boardArr[x + 1][y].ship = this.boardArr[x][y].ship;
  }

  // checks if the place has been hit
  checkHitList(x, y) {
    let flag = false;
    if (this.hitList.includes(this.boardArr[x][y].index)) {
      flag = true;
      return;
    }
    return flag;
  }

  // hits the ship and logs the index of boardArr into hitList
  receiveAttack(x, y) {
    if (this.checkHitList(x, y)) {
      console.log("Invalid target");
    } else {
      this.hitList.push(this.boardArr[x][y].index);
      this.boardArr[x][y].ship.hit();
      if (this.boardArr[x][y].ship.isSunk()) {
        this.shipCount -= 1;
        console.log("Ship has been sunk.");
      }
    }
  }

  // logs the board
  showBoard() {
    for (let i = 0; i < 10; i++) {
      let str = `${i + 1} `;
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


const board = new _boardBuilder__WEBPACK_IMPORTED_MODULE_0__.gameBoardObj();
board.placeShip(0, 0, 2);

board.placeShip(1, 1, 2);
board.placeShip(4, 8, 2);
board.placeShip(8, 5, 2);
board.placeShip(7, 3, 2);

console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.receiveAttack(0, 0);
board.receiveAttack(1, 0);
console.log(board.boardArr[0][0]);
console.log(board.boardArr[1][0]);
board.showBoard();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsUUFBUTtBQUMvQjtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0Esc0JBQXNCLEtBQUs7QUFDM0IsYUFBYTtBQUNiLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsaURBQU87QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsbUJBQW1CLE9BQU87QUFDMUIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixVQUFVO0FBQ1YsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qjs7Ozs7Ozs7Ozs7Ozs7O0FDN0d4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFbUI7Ozs7Ozs7VUM5Qm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDLGtCQUFrQix1REFBWTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBPYmogfSBmcm9tIFwiLi9zaGlwQnVpbGRlclwiO1xuXG4vLyBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4vLyAgIC8vIGluaXRpYWx6ZSAxMHgxMCBhcnJheVxuLy8gICBjb25zdCBib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgIGJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbi8vICAgfVxuXG4vLyAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBsZW4pID0+IHtcbi8vICAgICBib2FyZEFyclt4XVt5XSA9IG5ldyBzaGlwT2JqKDIpO1xuLy8gICAgIGJvYXJkQXJyW3ggKyAxXVt5XSA9IGJvYXJkQXJyW3hdW3ldO1xuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IHtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICAgIGxldCBzdHIgPSBgYDtcbi8vICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuLy8gICAgICAgICBpZiAoYm9hcmRBcnJbaV1bal0gPT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gWGA7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgICAgY29uc29sZS5sb2coc3RyKTtcbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHsgcGxhY2VTaGlwLCBib2FyZEFyciwgc2hvd0JvYXJkIH07XG4vLyB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcmVtb3ZlZC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBldmVyeSBhcnJheSBibG9jayBjb250YWlucyB0aGlzIG9iamVjdFxuY2xhc3MgYm9hcmRBcnJPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihpbmRleCkge1xuICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmNsYXNzIGdhbWVCb2FyZE9iaiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4gICAgfVxuICAgIHRoaXMubG9hZEJvYXJkQXJyKCk7XG4gICAgdGhpcy5oaXRMaXN0ID0gW107XG4gICAgdGhpcy5zaGlwQ291bnQgPSA1O1xuICB9XG5cbiAgLy8gaW5zZXJ0cyBib2FyZEFyck9iamVjdCBpbnRvIHRoZSBib2FyZEFyclxuICBsb2FkQm9hcmRBcnIoKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW2ldW2pdID0gbmV3IGJvYXJkQXJyT2JqZWN0KGluZGV4KTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwbGFjZXMgc2hpcCBpbnRvIHRoZSBib2FyZEFyciBvYmplY3RzXG4gIHBsYWNlU2hpcCh4LCB5LCBsZW4pIHtcbiAgICB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAgPSBuZXcgc2hpcE9iaigyKTtcbiAgICB0aGlzLmJvYXJkQXJyW3ggKyAxXVt5XS5zaGlwID0gdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwO1xuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHRoZSBwbGFjZSBoYXMgYmVlbiBoaXRcbiAgY2hlY2tIaXRMaXN0KHgsIHkpIHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpdExpc3QuaW5jbHVkZXModGhpcy5ib2FyZEFyclt4XVt5XS5pbmRleCkpIHtcbiAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gZmxhZztcbiAgfVxuXG4gIC8vIGhpdHMgdGhlIHNoaXAgYW5kIGxvZ3MgdGhlIGluZGV4IG9mIGJvYXJkQXJyIGludG8gaGl0TGlzdFxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5jaGVja0hpdExpc3QoeCwgeSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCB0YXJnZXRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGl0TGlzdC5wdXNoKHRoaXMuYm9hcmRBcnJbeF1beV0uaW5kZXgpO1xuICAgICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwLmhpdCgpO1xuICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICB0aGlzLnNoaXBDb3VudCAtPSAxO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNoaXAgaGFzIGJlZW4gc3Vuay5cIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbG9ncyB0aGUgYm9hcmRcbiAgc2hvd0JvYXJkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgbGV0IHN0ciA9IGAke2kgKyAxfSBgO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmICh0aGlzLmJvYXJkQXJyW2ldW2pdLnNoaXAgPT09IG51bGwpIHtcbiAgICAgICAgICBzdHIgPSBgJHtzdHJ9IC5gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IGdhbWVCb2FyZE9iaiB9O1xuIiwiLy8gY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbi8vICAgbGV0IGhpdHMgPSAwO1xuLy8gICBjb25zdCBsZW4gPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGxlbmd0aDtcbi8vICAgfTtcbi8vICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuLy8gICAgIGhpdHMgKz0gMTtcbi8vICAgfTtcbi8vICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuLy8gICAgIHJldHVybiBoaXRzID09PSBsZW5ndGg7XG4vLyAgIH07XG4vLyAgIHJldHVybiB7IGxlbiwgaXNTdW5rLCBoaXQsIGhpdHMgfTtcbi8vIH07XG5cbmNsYXNzIHNoaXBPYmoge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG4gIGxlbigpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5oaXRzID09PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgeyBzaGlwT2JqIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVCb2FyZE9iaiB9IGZyb20gXCIuL2JvYXJkQnVpbGRlclwiO1xuXG5jb25zdCBib2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTtcbmJvYXJkLnBsYWNlU2hpcCgwLCAwLCAyKTtcblxuYm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDQsIDgsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDcsIDMsIDIpO1xuXG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclsxXVswXSk7XG5ib2FyZC5yZWNlaXZlQXR0YWNrKDAsIDApO1xuYm9hcmQucmVjZWl2ZUF0dGFjaygxLCAwKTtcbmNvbnNvbGUubG9nKGJvYXJkLmJvYXJkQXJyWzBdWzBdKTtcbmNvbnNvbGUubG9nKGJvYXJkLmJvYXJkQXJyWzFdWzBdKTtcbmJvYXJkLnNob3dCb2FyZCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9