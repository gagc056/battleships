const playerFactory = (name, color) => {
  const playerInstance = {
    name,
    color,
    makeAttack: (gameboard, row, column) => {
      gameboard.receiveAttack(row, column);
    },
  };

  return playerInstance;
};

export default playerFactory;
