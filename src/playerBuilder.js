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

export { Player };
