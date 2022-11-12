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
      square.style.backgroundColor = "orange";
    }
  });
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
    const square = document.querySelector(
      `[data-coordinate-x="${randX}"][data-coordinate-y="${randY}"].right-block-square`
    );
    switch (this.attack(randX, randY)) {
      case 1:
        square.style.backgroundColor = "red";
        break;

      default:
        square.style.backgroundColor = "grey";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztVQzlCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0w7QUFLZDs7QUFFM0Isb0JBQW9CLHVEQUFZLElBQUk7QUFDcEMsb0JBQW9CLHVEQUFZO0FBQ2hDLGVBQWUsa0RBQU0sa0JBQWtCO0FBQ3ZDLGVBQWUsa0RBQU07O0FBRXJCLDREQUFVLGdCQUFnQjtBQUMxQiw0REFBVTs7QUFFVixvRUFBa0Isd0JBQXdCOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0VBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JvYXJkQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kb21NYW5pcHVsYXRpb24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheWVyQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9zaGlwQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBPYmogfSBmcm9tIFwiLi9zaGlwQnVpbGRlclwiO1xuXG4vLyBjb25zdCBnYW1lQm9hcmQgPSAoKSA9PiB7XG4vLyAgIC8vIGluaXRpYWx6ZSAxMHgxMCBhcnJheVxuLy8gICBjb25zdCBib2FyZEFyciA9IG5ldyBBcnJheSgxMCk7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuLy8gICAgIGJvYXJkQXJyW2ldID0gbmV3IEFycmF5KDEwKTtcbi8vICAgfVxuXG4vLyAgIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5LCBsZW4pID0+IHtcbi8vICAgICBib2FyZEFyclt4XVt5XSA9IG5ldyBzaGlwT2JqKDIpO1xuLy8gICAgIGJvYXJkQXJyW3ggKyAxXVt5XSA9IGJvYXJkQXJyW3hdW3ldO1xuLy8gICB9O1xuXG4vLyAgIGNvbnN0IHNob3dCb2FyZCA9ICgpID0+IHtcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbi8vICAgICAgIGxldCBzdHIgPSBgYDtcbi8vICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuLy8gICAgICAgICBpZiAoYm9hcmRBcnJbaV1bal0gPT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgICAgIHN0ciA9IGAke3N0cn0gWGA7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgc3RyID0gYCR7c3RyfSBPYDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuLy8gICAgICAgY29uc29sZS5sb2coc3RyKTtcbi8vICAgICB9XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHsgcGxhY2VTaGlwLCBib2FyZEFyciwgc2hvd0JvYXJkIH07XG4vLyB9O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vcmVtb3ZlZC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBldmVyeSBhcnJheSBibG9jayBjb250YWlucyB0aGlzIG9iamVjdFxuY2xhc3MgYm9hcmRBcnJPYmplY3Qge1xuICBjb25zdHJ1Y3RvcihpbmRleCkge1xuICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG59XG5cbmNsYXNzIGdhbWVCb2FyZE9iaiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmRBcnIgPSBuZXcgQXJyYXkoMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZEFycltpXSA9IG5ldyBBcnJheSgxMCk7XG4gICAgfVxuICAgIHRoaXMubG9hZEJvYXJkQXJyKCk7XG4gICAgdGhpcy5oaXRMaXN0ID0gW107XG4gICAgdGhpcy5zaGlwQ291bnQgPSAwO1xuICB9XG5cbiAgLy8gaW5zZXJ0cyBib2FyZEFyck9iamVjdCBpbnRvIHRoZSBib2FyZEFyclxuICBsb2FkQm9hcmRBcnIoKSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkQXJyW2ldW2pdID0gbmV3IGJvYXJkQXJyT2JqZWN0KGluZGV4KTtcbiAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBwbGFjZXMgc2hpcCBpbnRvIHRoZSBib2FyZEFyciBvYmplY3RzXG4gIHBsYWNlU2hpcCh4LCB5LCBsZW4pIHtcbiAgICBpZiAoeCArIGxlbiA+IDEwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBiZSBwbGFjZWQgaGVyZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwID0gbmV3IHNoaXBPYmoobGVuKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZEFyclt4ICsgaV1beV0uc2hpcCA9IHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hpcENvdW50ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHRoZSBwbGFjZSBoYXMgYmVlbiBoaXRcbiAgY2hlY2tIaXRMaXN0KHgsIHkpIHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhpdExpc3QuaW5jbHVkZXModGhpcy5ib2FyZEFyclt4XVt5XS5pbmRleCkpIHtcbiAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfVxuICAgIHJldHVybiBmbGFnO1xuICB9XG5cbiAgZ2FtZUVuZENoZWNrKCkge1xuICAgIGlmICh0aGlzLnNoaXBDb3VudCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coXCJHYW1lIGhhcyBlbmRlZFwiKTtcbiAgICB9XG4gIH1cblxuICBoaXRTaGlwKHgsIHkpIHtcbiAgICB0aGlzLmJvYXJkQXJyW3hdW3ldLnNoaXAuaGl0KCk7XG4gICAgaWYgKHRoaXMuYm9hcmRBcnJbeF1beV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgdGhpcy5zaGlwQ291bnQgLT0gMTtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBoYXMgYmVlbiBzdW5rLlwiKTtcbiAgICAgIHRoaXMuZ2FtZUVuZENoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaGl0cyB0aGUgYm9hcmQgYW5kIGxvZ3MgdGhlIGluZGV4IG9mIGJvYXJkQXJyIGludG8gaGl0TGlzdFxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5jaGVja0hpdExpc3QoeCwgeSkpIHtcbiAgICAgIHJldHVybiAyOyAvL2NsaWNrZWQgb24gYSBoaXQgcGxhY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaXRMaXN0LnB1c2godGhpcy5ib2FyZEFyclt4XVt5XS5pbmRleCk7XG4gICAgICBpZiAodGhpcy5ib2FyZEFyclt4XVt5XS5zaGlwICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuaGl0U2hpcCh4LCB5KTtcbiAgICAgICAgY29uc29sZS5sb2coYFNoaXAgaGl0IGF0IGNvb3JkaW5hdGVzIFske3h9XVske3l9XWApO1xuICAgICAgICByZXR1cm4gMTsgLy9oaXQgc2hpcFxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coYFNlYSBoaXQgYXQgY29vcmRpbmF0ZXMgWyR7eH1dWyR7eX1dYCk7XG4gICAgICByZXR1cm4gMDsgLy9oaXQgd2F0ZXJcbiAgICB9XG4gIH1cblxuICAvLyBsb2dzIHRoZSBib2FyZFxuICBzaG93Qm9hcmQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBsZXQgc3RyID0gYCR7aX0gYDtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZEFycltpXVtqXS5zaGlwID09PSBudWxsKSB7XG4gICAgICAgICAgc3RyID0gYCR7c3RyfSAuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSBgJHtzdHJ9IE9gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhzdHIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBnYW1lQm9hcmRPYmogfTtcbiIsImZ1bmN0aW9uIGJ1aWxkQm9hcmQoYmxvY2spIHtcbiAgY29uc3QgYmxvY2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtibG9ja31gKTtcbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBib2FyZC5jbGFzc0xpc3QuYWRkKFwiYm9hcmRcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYHNxdWFyZWApO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoYCR7YmxvY2t9LXNxdWFyZWApO1xuICAgICAgc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVggPSBqO1xuICAgICAgc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVkgPSBpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICAgIGJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbiAgYmxvY2tEaXYuYXBwZW5kQ2hpbGQoYm9hcmQpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRTaGlwcyhtZUJsb2NrLCBlbmVteSkge1xuICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7bWVCbG9ja30tc3F1YXJlYCk7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgaWYgKFxuICAgICAgZW5lbXkuZW5lbXlCb2FyZC5ib2FyZEFycltzcXVhcmUuZGF0YXNldC5jb29yZGluYXRlWF1bXG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZXG4gICAgICBdLnNoaXAgIT09IG51bGxcbiAgICApIHtcbiAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIm9yYW5nZVwiO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbm5lY3RQbGF5ZXJCb2FyZChlbmVteUJsb2NrLCBwbGF5ZXIsIEFJKSB7XG4gIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtlbmVteUJsb2NrfS1zcXVhcmVgKTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN3aXRjaCAoXG4gICAgICAgIHBsYXllci5hdHRhY2soc3F1YXJlLmRhdGFzZXQuY29vcmRpbmF0ZVgsIHNxdWFyZS5kYXRhc2V0LmNvb3JkaW5hdGVZKVxuICAgICAgKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBBSS5haUF0dGFjaygpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBzcXVhcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmF5XCI7XG4gICAgICAgICAgQUkuYWlBdHRhY2soKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgYnVpbGRCb2FyZCwgY29ubmVjdFBsYXllckJvYXJkLCBoaWdobGlnaHRTaGlwcyB9O1xuIiwiY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZW5lbXlCb2FyZCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5lbmVteUJvYXJkID0gZW5lbXlCb2FyZDtcbiAgfVxuXG4gIGF0dGFjayh4LCB5KSB7XG4gICAgc3dpdGNoICh0aGlzLmVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zb2xlLmxvZyhgUGxheWVyICR7dGhpcy5uYW1lfSBoYXMgaGl0IGEgc2hpcC5gKTtcbiAgICAgICAgcmV0dXJuIDE7XG5cbiAgICAgIGNhc2UgMDpcbiAgICAgICAgY29uc29sZS5sb2coYFBsYXllciAke3RoaXMubmFtZX0gaGFzIG1pc3NlZGApO1xuICAgICAgICByZXR1cm4gMDtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coYFBsYWNlIGhhcyBiZWVuIGFscmVhZHkgaGl0YCk7XG4gICAgICAgIHJldHVybiAyO1xuICAgIH1cbiAgfVxuXG4gIGFpQXR0YWNrKCkge1xuICAgIGxldCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgd2hpbGUgKFxuICAgICAgdGhpcy5lbmVteUJvYXJkLmhpdExpc3QuaW5jbHVkZXMoXG4gICAgICAgIHRoaXMuZW5lbXlCb2FyZC5ib2FyZEFycltyYW5kWF1bcmFuZFldLmluZGV4XG4gICAgICApXG4gICAgKSB7XG4gICAgICByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIHJhbmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWNvb3JkaW5hdGUteD1cIiR7cmFuZFh9XCJdW2RhdGEtY29vcmRpbmF0ZS15PVwiJHtyYW5kWX1cIl0ucmlnaHQtYmxvY2stc3F1YXJlYFxuICAgICk7XG4gICAgc3dpdGNoICh0aGlzLmF0dGFjayhyYW5kWCwgcmFuZFkpKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNxdWFyZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc3F1YXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCIvLyBjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuLy8gICBsZXQgaGl0cyA9IDA7XG4vLyAgIGNvbnN0IGxlbiA9ICgpID0+IHtcbi8vICAgICByZXR1cm4gbGVuZ3RoO1xuLy8gICB9O1xuLy8gICBjb25zdCBoaXQgPSAoKSA9PiB7XG4vLyAgICAgaGl0cyArPSAxO1xuLy8gICB9O1xuLy8gICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4vLyAgICAgcmV0dXJuIGhpdHMgPT09IGxlbmd0aDtcbi8vICAgfTtcbi8vICAgcmV0dXJuIHsgbGVuLCBpc1N1bmssIGhpdCwgaGl0cyB9O1xuLy8gfTtcblxuY2xhc3Mgc2hpcE9iaiB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cbiAgbGVuKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHMgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG5cbmV4cG9ydCB7IHNoaXBPYmogfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZUJvYXJkT2JqIH0gZnJvbSBcIi4vYm9hcmRCdWlsZGVyXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJCdWlsZGVyXCI7XG5pbXBvcnQge1xuICBidWlsZEJvYXJkLFxuICBjb25uZWN0UGxheWVyQm9hcmQsXG4gIGhpZ2hsaWdodFNoaXBzLFxufSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcblxuY29uc3QgbXlCb2FyZCA9IG5ldyBnYW1lQm9hcmRPYmooKTsgLy9jcmVhdGVzIHRoZSBvYmplY3RcbmNvbnN0IGFpQm9hcmQgPSBuZXcgZ2FtZUJvYXJkT2JqKCk7XG5jb25zdCBtZSA9IG5ldyBQbGF5ZXIoXCJKb2VcIiwgbXlCb2FyZCk7IC8vY3JlYXRlcyB0aGUgcGxheWVyXG5jb25zdCBBSSA9IG5ldyBQbGF5ZXIoXCJSb2JvdFwiLCBhaUJvYXJkKTtcblxuYnVpbGRCb2FyZChcImxlZnQtYmxvY2tcIik7IC8vY3JlYXRlcyB0aGUgRE9NXG5idWlsZEJvYXJkKFwicmlnaHQtYmxvY2tcIik7XG5cbmNvbm5lY3RQbGF5ZXJCb2FyZChcImxlZnQtYmxvY2tcIiwgbWUsIEFJKTsgLy9jb25uZWN0cyB0aGUgcGxheWVyIHRvIHRoZSBlbmVteSBib2FyZFxuXG5teUJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcbm15Qm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xubXlCb2FyZC5wbGFjZVNoaXAoNCwgOCwgNSk7XG5teUJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbm15Qm9hcmQucGxhY2VTaGlwKDcsIDMsIDMpO1xuXG5haUJvYXJkLnBsYWNlU2hpcCgwLCAwLCA0KTtcbmFpQm9hcmQucGxhY2VTaGlwKDEsIDEsIDIpO1xuYWlCb2FyZC5wbGFjZVNoaXAoNCwgOCwgNSk7XG5haUJvYXJkLnBsYWNlU2hpcCg4LCA1LCAyKTtcbmFpQm9hcmQucGxhY2VTaGlwKDcsIDMsIDMpO1xuXG5oaWdobGlnaHRTaGlwcyhcInJpZ2h0LWJsb2NrXCIsIEFJKTtcblxuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclswXVswXSk7XG5jb25zb2xlLmxvZyhteUJvYXJkLmJvYXJkQXJyWzFdWzBdKTtcbi8vIG1lLmF0dGFjaygwLCAwKTtcbi8vIG1lLmF0dGFjaygxLCAwKTtcbi8vIG1lLmF0dGFjaygwLCAwKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG4vLyBtZS5haUF0dGFjaygpO1xuLy8gbWUuYWlBdHRhY2soKTtcbi8vIG1lLmFpQXR0YWNrKCk7XG5cbmNvbnNvbGUubG9nKG15Qm9hcmQuYm9hcmRBcnJbMF1bMF0pO1xuY29uc29sZS5sb2cobXlCb2FyZC5ib2FyZEFyclsxXVswXSk7XG5teUJvYXJkLnNob3dCb2FyZCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9