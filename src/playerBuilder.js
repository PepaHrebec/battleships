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
    this.attack(randX, randY);
    const square = document.querySelector(
      `[data-coordinate-x="${randX}"][data-coordinate-y="${randY}"].right-block-square`
    );
    square.style.backgroundColor = "grey";
  }
}

export { Player };
