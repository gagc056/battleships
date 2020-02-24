import playerFactory from '../player';
import battleCanvasFactory from '../canvas';

const COMPUTER_PURPLE = '#803587';

const computerAttack = (computerPlayer, humanGameboard) => {
  let row = Math.trunc(Math.random() * 10);
  let column = Math.trunc(Math.random() * 10);
  while (humanGameboard.statusAt(row, column) !== null) {
    row = Math.trunc(Math.random() * 10);
    column = Math.trunc(Math.random() * 10);
  }
  computerPlayer.makeAttack(humanGameboard, row, column);
  return [row, column];
};

const evaluateWinner = (state) => {
  let hasAllSunk = false;
  const humanSunk = state.humanGameboard.allSunk();
  const computerSunk = state.computerGameboard.allSunk();

  if (humanSunk && computerSunk) {
    state.statusBar.innerText = "IT'S A DRAW!";
    hasAllSunk = true;
  } else if (humanSunk) {
    state.statusBar.innerText = "WINNER: COMPUTER!";
    hasAllSunk = true;
  } else if (computerSunk) {
    state.statusBar.innerText = "WINNER: HUMAN!";
    hasAllSunk = true;
  }

  return hasAllSunk;
};

const battleLoop = (state) => {
  if (evaluateWinner(state)) {
    return;
  }

  const row = state.computerBattle.scopeRow;
  const column = state.computerBattle.scopeColumn;

  if (state.computerGameboard.statusAt(row, column) !== null) {    
    return;
  }

  state.humanPlayer.makeAttack(state.computerGameboard, row, column);
  const [pcRow, pcColumn] = computerAttack(state.computerPlayer, state.humanGameboard);

  state.statusBar.innerText =  `HUMAN FIRES AT (${row},${column}), COMPUTER FIRES AT (${pcRow},${pcColumn})`;
  
  state.humanBattle.render();
  state.computerBattle.render();
  
  evaluateWinner(state);
};

const playComputerStartFactory = (buttons, bars, canvases, icons) => {
  const { fireMissile } = buttons;
  const { status } = bars;
  const { humanCanvas, computerCanvas } = canvases;

  return ((gameLoop) => {
    const humanGameboard = gameLoop.gameboards[0];
    const humanName = gameLoop.names[0];
    const humanColor = gameLoop.colors[0];
    const humanPlayer = playerFactory(humanName, humanColor);

    const computerGameboard = gameLoop.gameboards[1];
    const computerName = 'Computer';
    const computerColor = COMPUTER_PURPLE;
    const computerPlayer = playerFactory(computerName, computerColor);

    const humanBattle = battleCanvasFactory(humanCanvas, icons);
    const computerBattle = battleCanvasFactory(computerCanvas, icons);

    humanBattle.gameboard = humanGameboard;
    humanBattle.showScope = false;
    humanBattle.showShips = true;
    humanBattle.showIcons = true;

    computerBattle.gameboard = computerGameboard;
    computerBattle.showScope = true;
    computerBattle.showShips = false;
    computerBattle.showIcons = true;

    humanBattle.render();
    computerBattle.render();

    const state = {
      statusBar: status,
      humanGameboard: humanGameboard,
      humanBattle: humanBattle,
      humanPlayer: humanPlayer,
      computerGameboard: computerGameboard,
      computerBattle: computerBattle,
      computerPlayer: computerPlayer,
    };

    fireMissile.onclick = () => {
      battleLoop(state);
    };
  });
};

export default playComputerStartFactory;
