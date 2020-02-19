
describe('When a player is created', () => {
  test(' Player 1  and Player 2 created', () => {
    const Player1 = Player('Gaston', 'red');
    const Player2 = Player('Amanda', 'blue');
    expect(Player1).toMatchObject({
      name: 'Gaston',
      color: 'red',
    });
    expect(Player2).toMatchObject({
      name: 'Amanda',
      color: 'blue',
    });
  });
});

describe('Player: madeAttack() (Player makes attack to grid) ', () => {
  test('Player 1 makes an attack successfully to grid #1', () => {
    const Player1 = Player('', 'blue');
    const Gameboard2 = Gameboard(0, 8);
    nPlayer1.makeAttack(Gameboard2, [0, 0]);
    expect(Gameboard2.grid[0][0]).toBe('X');
    expect(Player1.attacksMade).toEqual([[0, 0]]);
  });

});
