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

export { buildBoard, connectBoard };
