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
  return { len, isSunk, hit };
};

export { Ship };
