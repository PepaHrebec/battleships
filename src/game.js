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

export { buildBoard, connectPlayerBoard };
