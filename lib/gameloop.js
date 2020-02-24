const setupGameLoop = (elements, starts) => {
  elements.newGame.style.visibility = 'hidden';
  elements.placement.style.visibility = 'hidden';
  elements.playComputer.style.visibility = 'hidden';

  const gameLoop = {
    phases: {
      newGame: {
        start: starts.newGame,
        element: elements.newGame,
      },
      placement: {
        start: starts.placement,
        element: elements.placement,
      },
      playComputer: {
        start: starts.playComputer,
        element: elements.playComputer,
      },
    },
    hideAll: () => {
      const phases = Object.values(gameLoop.phases);
      for (let i = 0; i < phases.length; i += 1) {
        phases[i].element.style.visibility = 'hidden';
      }
    },
    setPhase: (phase) => {
      gameLoop.hideAll();
      switch (phase) {
        case 'NEW_GAME':
          gameLoop.phases.newGame.start(gameLoop);
          gameLoop.phases.newGame.element.style.visibility = 'visible';
          break;

        case 'PLACEMENT':
          gameLoop.phases.placement.start(gameLoop);
          gameLoop.phases.placement.element.style.visibility = 'visible';
          break;

        case 'PLAY_COMPUTER':
          gameLoop.phases.playComputer.start(gameLoop);
          gameLoop.phases.playComputer.element.style.visibility = 'visible';
          break;

        default:
          break;
      }
    },
    gameboards: [null, null],
    names: [null, null],
    colors: [null, null],
    selectedGameboard: 0,
    nextScreen: null,
  };

  return gameLoop;
};

export default setupGameLoop;
