import shipFactory from '../ship';
import gameboardFactory from '../gameboard';

const createComputerGameboard = () => {
  const gameboard = gameboardFactory();
  let shipsPlaced = 0;
  while (shipsPlaced < 4) {
    const ship = shipFactory(4);
    const row = Math.trunc(Math.random() * 10);
    const column = Math.trunc(Math.random() * 10);
    const orientation = (row + column) % 2 === 0 ? 'HORIZONTAL' : 'VERTICAL';
    if (gameboard.placeShip(ship, row, column, orientation)) {
      shipsPlaced += 1;
    }
  }

  return gameboard;
};

const newGameStartFactory = (buttons, form) => {
  const { newGame } = buttons;
  const { playerName, playerColor } = form;

  return ((gameLoop) => {
    newGame.onclick = () => {
      const emptyRegex = /^\s*$/;
      if (playerName.value.match(emptyRegex)) {
        return;
      }

      gameLoop.names[0] = playerName.value;
      gameLoop.colors[0] = playerColor.value;
      gameLoop.gameboards[1] = createComputerGameboard();
      gameLoop.setPhase('PLACEMENT');
    };
  });
};

export default newGameStartFactory;
