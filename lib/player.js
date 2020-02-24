const playerFactory = (name, color) => {
  const playerInstance = {
    name: name,
    color: color,
    makeAttack: (gameboard, row, column) => {
      gameboard.receiveAttack(row, column);
    },
  };

  return playerInstance;
};

export default playerFactory;
