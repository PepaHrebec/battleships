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
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "gameBoardObj": () => (/* binding */ gameBoardObj)
/* harmony export */ });
/* harmony import */ var _shipBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipBuilder */ "./src/shipBuilder.js");


const gameBoard = () => {
  // initialze 10x10 array
  const boardArr = new Array(10);
  for (let i = 0; i < 10; i++) {
    boardArr[i] = new Array(10);
  }

  const placeShip = (x, y, len) => {
    boardArr[x][y] = new _shipBuilder__WEBPACK_IMPORTED_MODULE_0__.shipObj(2);
    boardArr[x + 1][y] = boardArr[x][y];
  };

  const showBoard = () => {
    for (let i = 0; i < 10; i++) {
      let str = ``;
      for (let j = 0; j < 10; j++) {
        if (boardArr[i][j] === undefined) {
          str = `${str} X`;
        } else {
          str = `${str} O`;
        }
      }
      console.log(str);
    }
  };

  return { placeShip, boardArr, showBoard };
};

class gameBoardObj {
  constructor() {
    this.boardArr = new Array(10);
    for (let i = 0; i < 10; i++) {
      this.boardArr[i] = new Array(10);
    }
    this.hitList = [];
  }
  placeShip(x, y, len) {
    this.boardArr[x][y] = new _shipBuilder__WEBPACK_IMPORTED_MODULE_0__.shipObj(2);
    this.boardArr[x + 1][y] = this.boardArr[x][y];
  }

  checkHitList(x, y) {
    let flag = false;
    this.hitList.forEach((entry) => {
      if (entry[0] == x && entry[1] == y) {
        flag = true;
      }
    });
    return flag; /// THIS IS STUPID AAAAAAAAAAAAAAAAAAAA
  }

  receiveAttack(x, y) {
    if (this.checkHitList(x, y)) {
      console.log("Invalid target");
    } else {
      this.hitList.push([x, y]);
      this.boardArr[x][y].hit();
    }
    console.log(this.hitList);
  }

  showBoard() {
    for (let i = 0; i < 10; i++) {
      let str = ``;
      for (let j = 0; j < 10; j++) {
        if (this.boardArr[i][j] === undefined) {
          str = `${str} X`;
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
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "shipObj": () => (/* binding */ shipObj)
/* harmony export */ });
const Ship = (length) => {
  let hits = 0;
  const len = () => {
    return length;
  };
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => {
    return hits === length;
  };
  return { len, isSunk, hit, hits };
};

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThDOztBQUU5QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLGlEQUFPO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEIsVUFBVTtBQUNWLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaURBQU87QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCLFVBQVU7QUFDVixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRW1DOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0VuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFeUI7Ozs7Ozs7VUM5QnpCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUQ7O0FBRXpELGtCQUFrQix1REFBWTtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9ib2FyZEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvc2hpcEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwLCBzaGlwT2JqIH0gZnJvbSBcIi4vc2hpcEJ1aWxkZXJcIjtcblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuICAvLyBpbml0aWFsemUgMTB4MTAgYXJyYXlcbiAgY29uc3QgYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSwgbGVuKSA9PiB7XG4gICAgYm9hcmRBcnJbeF1beV0gPSBuZXcgc2hpcE9iaigyKTtcbiAgICBib2FyZEFyclt4ICsgMV1beV0gPSBib2FyZEFyclt4XVt5XTtcbiAgfTtcblxuICBjb25zdCBzaG93Qm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBsZXQgc3RyID0gYGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKGJvYXJkQXJyW2ldW2pdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdHIgPSBgJHtzdHJ9IFhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gT2A7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYWNlU2hpcCwgYm9hcmRBcnIsIHNob3dCb2FyZCB9O1xufTtcblxuY2xhc3MgZ2FtZUJvYXJkT2JqIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgICB9XG4gICAgdGhpcy5oaXRMaXN0ID0gW107XG4gIH1cbiAgcGxhY2VTaGlwKHgsIHksIGxlbikge1xuICAgIHRoaXMuYm9hcmRBcnJbeF1beV0gPSBuZXcgc2hpcE9iaigyKTtcbiAgICB0aGlzLmJvYXJkQXJyW3ggKyAxXVt5XSA9IHRoaXMuYm9hcmRBcnJbeF1beV07XG4gIH1cblxuICBjaGVja0hpdExpc3QoeCwgeSkge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgdGhpcy5oaXRMaXN0LmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnlbMF0gPT0geCAmJiBlbnRyeVsxXSA9PSB5KSB7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmbGFnOyAvLy8gVEhJUyBJUyBTVFVQSUQgQUFBQUFBQUFBQUFBQUFBQUFBQUFcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmNoZWNrSGl0TGlzdCh4LCB5KSkge1xuICAgICAgY29uc29sZS5sb2coXCJJbnZhbGlkIHRhcmdldFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaXRMaXN0LnB1c2goW3gsIHldKTtcbiAgICAgIHRoaXMuYm9hcmRBcnJbeF1beV0uaGl0KCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuaGl0TGlzdCk7XG4gIH1cblxuICBzaG93Qm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBsZXQgc3RyID0gYGA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRBcnJbaV1bal0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN0ciA9IGAke3N0cn0gWGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc3RyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZ2FtZUJvYXJkLCBnYW1lQm9hcmRPYmogfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBoaXRzID0gMDtcbiAgY29uc3QgbGVuID0gKCkgPT4ge1xuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBoaXRzICs9IDE7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cyA9PT0gbGVuZ3RoO1xuICB9O1xuICByZXR1cm4geyBsZW4sIGlzU3VuaywgaGl0LCBoaXRzIH07XG59O1xuXG5jbGFzcyBzaGlwT2JqIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRzID0gMDtcbiAgfVxuICBsZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICB9XG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCwgc2hpcE9iaiB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lQm9hcmQsIGdhbWVCb2FyZE9iaiB9IGZyb20gXCIuL2JvYXJkQnVpbGRlclwiO1xuXG5jb25zdCBib2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTtcbmJvYXJkLnBsYWNlU2hpcCgwLCAwLCAyKTtcblxuYm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDQsIDAsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDgsIDAsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDcsIDMsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDgsIDUsIDIpO1xuYm9hcmQucGxhY2VTaGlwKDUsIDksIDIpO1xuXG4vLyBjb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclswXVswXSk7XG4vLyBjb25zb2xlLmxvZyhib2FyZC5ib2FyZEFyclsxXVswXSk7XG5ib2FyZC5yZWNlaXZlQXR0YWNrKDAsIDApO1xuYm9hcmQucmVjZWl2ZUF0dGFjaygwLCAwKTtcbi8vIGNvbnNvbGUubG9nKGJvYXJkLmJvYXJkQXJyWzBdWzBdKTtcbi8vIGNvbnNvbGUubG9nKGJvYXJkLmJvYXJkQXJyWzFdWzBdKTtcbmJvYXJkLnNob3dCb2FyZCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9