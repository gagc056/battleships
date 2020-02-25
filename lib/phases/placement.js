import gameboardFactory from '../gameboard';
import shipFactory from '../ship';
import battleCanvasFactory from '../canvas';

const placementStartFactory = (buttons, bars, form, canvas, icons, nextPhase) => {
  const { placeShip, resetGameboard, startGame } = buttons;
  const { status, error } = bars;

  const state = {
    shipsLeft: 4,
    error: null,
    gameboard: gameboardFactory(),
    battleCanvas: battleCanvasFactory(canvas, icons),
  };

  const update = () => {
    state.battleCanvas.setScopeCoordinates(state.row, state.column);
    state.battleCanvas.render();

    if (state.shipsLeft > 0) {
      status.innerText = `There are ${state.shipsLeft} ship(s) left to be placed!`;
    } else {
      status.innerText = 'No more ships to be placed! Start the game!';
    }

    if (state.error !== null) {
      error.innerText = state.error;
    } else {
      error.innerText = '';
    }
  };

  const reset = () => {
    state.shipsLeft = 4;
    state.error = null;
    state.gameboard = gameboardFactory();
    state.row = 0;
    state.column = 0;
    state.battleCanvas.gameboard = state.gameboard;
    state.battleCanvas.showScope = true;
    state.battleCanvas.showShips = true;
    state.battleCanvas.showIcons = false;
    state.battleCanvas.setScopeCoordinates(state.row, state.column);
    state.battleCanvas.onscopechange = (row, column) => {
      state.row = row;
      state.column = column;
      form.shipRow.value = row;
      form.shipColumn.value = column;
      update();
    };

    form.shipRow.value = state.row;
    form.shipColumn.value = state.column;
    form.shipOrientation.selectedIndex = 0;
  };

  return ((gameLoop) => {
    reset();

    form.shipRow.onchange = () => {
      state.row = Number.parseInt(form.shipRow.value, 10);
      update();
    };

    form.shipColumn.onchange = () => {
      state.column = Number.parseInt(form.shipColumn.value, 10);
      update();
    };

    placeShip.onclick = () => {
      if (state.shipsLeft > 0) {
        const ship = shipFactory(4);
        const row = Number.parseInt(form.shipRow.value, 10);
        const column = Number.parseInt(form.shipColumn.value, 10);
        const orientation = form.shipOrientation.selectedOptions[0].value;
        if (state.gameboard.placeShip(ship, row, column, orientation)) {
          state.shipsLeft -= 1;
          state.error = null;
        } else {
          state.error = "Can't place ship there!";
        }
      } else {
        state.error = "Can't place more ships!";
      }
      update();
    };

    resetGameboard.onclick = () => {
      reset();
      update();
    };

    startGame.onclick = () => {
      if (state.shipsLeft === 0) {
        gameLoop.gameboards[gameLoop.selectedGameboard] = state.gameboard;
        gameLoop.setPhase(nextPhase);
      } else {
        state.error = 'Place all ships before starting the game!';
        update();
      }
    };

    update();
  });
};

export default placementStartFactory;
