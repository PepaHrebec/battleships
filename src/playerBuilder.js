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

export { Player };
