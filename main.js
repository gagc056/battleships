import setupGameLoop from './lib/gameloop';
import newGameStartFactory from './lib/phases/new-game';
import placementStartFactory from './lib/phases/placement';
import playComputerStartFactory from './lib/phases/play-computer';

/* ICONS REQUIRED FOR BATTLE CANVAS */
let waterDropletIcon = document.getElementById('water-droplet');
let explosionIcon = document.getElementById('explosion');
let targetScopeIcon = document.getElementById('target-scope');

let icons = {
  waterDropletIcon: waterDropletIcon,
  explosionIcon: explosionIcon,
  targetScopeIcon: targetScopeIcon,
};

/* SCREENS FOR EACH PHASE OF THE GAME */
let phaseScreenNewGame = document.getElementById('phase-screen-new-game');
let phaseScreenPlacement = document.getElementById('phase-screen-placement');
let phaseScreenPlayComputer = document.getElementById('phase-screen-play-computer');

let elements = {
  newGame: phaseScreenNewGame,
  placement: phaseScreenPlacement,
  playComputer: phaseScreenPlayComputer,
};

/* BUTTONS AND FORM INPUTS FOR NEW_GAME PHASE */
let buttonNewGame = document.getElementById('button-new-game');

let newGameButtons = {
  newGame: buttonNewGame,
};

let stringPlayerName = document.getElementById('string-player-name');
let colorPlayerColor = document.getElementById('color-player-color');

let newGameForm = {
  playerName: stringPlayerName,
  playerColor: colorPlayerColor,
};

const newGameStart = newGameStartFactory(newGameButtons, newGameForm)

/* BUTTONS, BARS, FORM INPUTS AND CANVAS FOR PLACEMENT PHASE */
let buttonPlaceShip = document.getElementById('button-place-ship');
let buttonStartGame = document.getElementById('button-start-game');
let buttonResetGameboard = document.getElementById('button-reset-gameboard');

let placementButtons = {
  placeShip: buttonPlaceShip,
  startGame: buttonStartGame,
  resetGameboard: buttonResetGameboard,
};

let barPlacementStatus = document.getElementById('bar-placement-status');
let barPlacementError = document.getElementById('bar-placement-error');

let placementBars = {
  status: barPlacementStatus,
  error: barPlacementError,
};

let numberShipRow = document.getElementById('number-ship-row');
let numberShipColumn = document.getElementById('number-ship-column');
let selectShipOrientation = document.getElementById('select-ship-orientation');

let placementForm = {
  shipRow: numberShipRow,
  shipColumn: numberShipColumn,
  shipOrientation: selectShipOrientation,
};

let canvasPlacement = document.getElementById('canvas-placement');

const placementStart = placementStartFactory(
    placementButtons,
    placementBars,
    placementForm,
    canvasPlacement,
    icons,
    'PLAY_COMPUTER',
);

/* BUTTONS, BARS AND CANVASES FOR PLAY_COMPUTER PHASE */
let buttonLaunchFire = document.getElementById('button-launch-fire');

const playComputerButtons = {
  fireMissile: buttonLaunchFire,
};

let statusPlayComputer = document.getElementById('status-play-computer');

const playComputerBars = {
  status: statusPlayComputer,
};

let canvasHumanPlayer = document.getElementById('canvas-human-player');
let canvasComputerPlayer = document.getElementById('canvas-computer-player');

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

let starts = {
  newGame: newGameStart,
  placement: placementStart,
  playComputer: playComputerStart,
};

const gameLoop = setupGameLoop(elements, starts);
document.gameLoop = gameLoop;
gameLoop.setPhase('NEW_GAME');
