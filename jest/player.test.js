import playerFactory from '../lib/player';
import gameboardFactory from '../lib/gameboard';
import shipFactory from '../lib/ship';
const ship1=shipFactory(4);
const ship2=shipFactory(4);
const ship3=shipFactory(4);
const ship4=shipFactory(4);
const gameboard1=gameboardFactory();
const gameboard2=gameboardFactory();
gameboard1.placeShip(ship1, 0, 0, 'HORIZONTAL');
gameboard1.placeShip(ship2, 1, 0, 'VERTICAL');
gameboard2.placeShip(ship3, 4, 4, 'HORIZONTAL');
gameboard2.placeShip(ship4, 5, 4, 'VERTICAL');
const player1 = playerFactory('Gaston', 'red');
const player2 = playerFactory('Amanda', 'blue');


describe('playerFactory', () => {
  test(' Player 1  and Player 2 created', () => {
    expect(player1).toMatchObject({
      name: 'Gaston',
      color: 'red',
    });
    expect(player2).toMatchObject({
      name: 'Amanda',
      color: 'blue',
    });
  });

  test('makeAttack', ()=>{
    expect(gameboard2.statusAt(3,3)).toBe(null)
    player1.makeAttack(gameboard2,3,3);
    expect(gameboard2.statusAt(3,3)).toBe('MISS');
    player2.makeAttack(gameboard1,1,4);
    expect(gameboard1.statusAt(1,4)).toBe('HIT');

  })
});




