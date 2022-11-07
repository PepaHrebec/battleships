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

export { Ship, shipObj };
