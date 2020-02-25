import setupGameLoop from './lib/gameloop';
import newGameStartFactory from './lib/phases/new-game';
import placementStartFactory from './lib/phases/placement';
import playComputerStartFactory from './lib/phases/play-computer';

/* ICONS REQUIRED FOR BATTLE CANVAS */
const waterDropletIcon = document.getElementById('water-droplet');
const explosionIcon = document.getElementById('explosion');
const targetScopeIcon = document.getElementById('target-scope');

const icons = {
  waterDropletIcon,
  explosionIcon,
  targetScopeIcon,
};

/* SCREENS FOR EACH PHASE OF THE GAME */
const phaseScreenNewGame = document.getElementById('phase-screen-new-game');
const phaseScreenPlacement = document.getElementById('phase-screen-placement');
const phaseScreenPlayComputer = document.getElementById('phase-screen-play-computer');

const elements = {
  newGame: phaseScreenNewGame,
  placement: phaseScreenPlacement,
  playComputer: phaseScreenPlayComputer,
};

/* BUTTONS AND FORM INPUTS FOR NEW_GAME PHASE */
const buttonNewGame = document.getElementById('button-new-game');

const newGameButtons = {
  newGame: buttonNewGame,
};

const stringPlayerName = document.getElementById('string-player-name');
const colorPlayerColor = document.getElementById('color-player-color');

const newGameForm = {
  playerName: stringPlayerName,
  playerColor: colorPlayerColor,
};

const newGameStart = newGameStartFactory(newGameButtons, newGameForm);

/* BUTTONS, BARS, FORM INPUTS AND CANVAS FOR PLACEMENT PHASE */
const buttonPlaceShip = document.getElementById('button-place-ship');
const buttonStartGame = document.getElementById('button-start-game');
const buttonResetGameboard = document.getElementById('button-reset-gameboard');

const placementButtons = {
  placeShip: buttonPlaceShip,
  startGame: buttonStartGame,
  resetGameboard: buttonResetGameboard,
};

const barPlacementStatus = document.getElementById('bar-placement-status');
const barPlacementError = document.getElementById('bar-placement-error');

const placementBars = {
  status: barPlacementStatus,
  error: barPlacementError,
};

const numberShipRow = document.getElementById('number-ship-row');
const numberShipColumn = document.getElementById('number-ship-column');
const selectShipOrientation = document.getElementById('select-ship-orientation');

const placementForm = {
  shipRow: numberShipRow,
  shipColumn: numberShipColumn,
  shipOrientation: selectShipOrientation,
};

const canvasPlacement = document.getElementById('canvas-placement');

const placementStart = placementStartFactory(
  placementButtons,
  placementBars,
  placementForm,
  canvasPlacement,
  icons,
  'PLAY_COMPUTER',
);

/* BUTTONS, BARS AND CANVASES FOR PLAY_COMPUTER PHASE */
const buttonLaunchFire = document.getElementById('button-launch-fire');

const playComputerButtons = {
  fireMissile: buttonLaunchFire,
};

const statusPlayComputer = document.getElementById('status-play-computer');

const playComputerBars = {
  status: statusPlayComputer,
};

const canvasHumanPlayer = document.getElementById('canvas-human-player');
const canvasComputerPlayer = document.getElementById('canvas-computer-player');

const playComputerCanvases = {
  humanCanvas: canvasHumanPlayer,
  computerCanvas: canvasComputerPlayer,
};

const playComputerStart = playComputerStartFactory(
  playComputerButtons,
  playComputerBars,
  playComputerCanvases,
  icons,
);

const starts = {
  newGame: newGameStart,
  placement: placementStart,
  playComputer: playComputerStart,
};

const gameLoop = setupGameLoop(elements, starts);
gameLoop.setPhase('NEW_GAME');
