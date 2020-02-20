import playerFactory from '../lib/player';
import gameboardFactory from '../lib/gameboard';
describe('When a player is created', () => {
  test(' Player 1  and Player 2 created', () => {
    const player1 = playerFactory('Gaston', 'red');
    const player2 = playerFactory('Amanda', 'blue');
    expect(player1).toMatchObject({
      name: 'Gaston',
      color: 'red',
    });
    expect(player2).toMatchObject({
      name: 'Amanda',
      color: 'blue',
    });
  });
});

describe('Player: makeAttack() (Player makes attack to grid) ', () => {
  test('Player 1 makes an attack successfully to grid ', () => {
    const Player1 = Player('Gaston', 'red');
    const Gameboard2 = Gameboard[0, 8];
    Player1.makeAttack(Gameboard2, [0, 0]);
    expect(Gameboard2.grid[0][0]).toBe('X');
    expect(Player1.attacksMade).toEqual([[0, 0]]);
  });

  test('Player 2 makes an attack successfully to grid', () => {
    const Player2 = Player('Amanda', 'blue');
    const Gameboard1 = Gameboard(0, 8);
    Player2.makeAttack(Gameboard1, [0, 1]);
    expect(Gameboard1.grid[0][1]).toBe('X');
    expect(Player1.attacksMade).toEqual([[0, 1]]);
  });

});
