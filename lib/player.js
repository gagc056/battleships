const Player = (name, color) => {
  const playerInstance = {
    name: name,
    color: color,
    makeAttack: (gameboard, coordinates) => {
      const [x, y] = coordinates;
      /* TODO: gameboard receiveAttack */
    },
  };

  return playerInstance;
};

export default Player;
