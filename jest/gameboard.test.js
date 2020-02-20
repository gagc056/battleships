import gameboardFactory from  '../lib/gameboard';
import shipFactory from '../lib/ship';
describe('gameboardFactory', () => {
    const gameboard=gameboardFactory();
    test('it returns correct properties', () => {
      expect(gameboard).toMatchObject({
        placeShip: expect.any(Function),
        receiveAttack:expect.any(Function),
        allSunk:expect.any(Function),
        ships:expect.any(Array),
        hits:expect.any(Array),
        misses:expect.any(Array),
      });
      expect(gameboard.ships).toMatchObject([])
    });

    test('placeShip function',()=>{
        const shipRow=0;
        const shipColumn=0;
        const ship=shipFactory(4);
        const orientation= 'HORIZONTAL';
        gameboard.placeShip(ship, shipRow, shipColumn, orientation);
        expect(gameboard.ships).toMatchObject(
            [{
                row: shipRow,
                column: shipColumn,
                orientation: 'HORIZONTAL',
                ship: ship,
               }]
        );
        const ship2=shipFactory(4);
        gameboard.placeShip();
        expect(gameboard.ships).toMatchObject([{
            row: shipRow,
            column: shipColumn,
            orientation: 'HORIZONTAL',
            ship: ship,
            },
            { row: 1,
            column: 4,
            orientation: 'VERTICAL',
            ship: ship2,
            }]
        );

    });
    test('receiveAttack',()=>{
        gameboard.receiveAttack(9,9);
        gameboard.receiveAttack(8,8);

        expect(gameboard.hits).toMatchObject([]);
        expect(gameboard.misses).toMatchObject([[9,9], [8,8]]);
            
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(1,4);
        expect(gameboard.hits).toMatchObject([[0,0], [1,4]]);
        expect(gameboard.misses).toMatchObject([[9,9], [8,8]]);

    });

    test('allSunk',()=>{
        expect(gameboard.allSunk()).toBe(false);
        gameboard.receiveAttack(0,0);
        gameboard.receiveAttack(1,0);
        gameboard.receiveAttack(2,0);
        gameboard.receiveAttack(3,0);
        expect(gameboard.allSunk()).toBe(false);
        gameboard.receiveAttack(1,4);
        gameboard.receiveAttack(1,5);
        gameboard.receiveAttack(1,6);
        gameboard.receiveAttack(1,7);
        expect(gameboard.allSunk()).toBe(true);
    })


})