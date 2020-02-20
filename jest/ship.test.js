import shipFactory from '../lib/ship';
const length = 4;
const ship = shipFactory(length);
describe('shipFactory function', () => {
  test('should have correct properties', () => {
    expect(ship).toMatchObject({
      length: expect.any(Number),
      isSunk: expect.any(Function),
      hit: expect.any(Function),
    });
  });

  test('should verify the length property', () => {
    expect(ship.length).toBe(4);
  });
});

describe('hit and isSunk function', () =>{

  test('should return false if there is element in the position array', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('should return true if a successful hit is done ', () => {
    expect(ship.hit(0)).toBe(true);
  });

  test('should return false if not in the array', () => {
    expect(ship.hit(4)).toBe(false);
  });

  test('should sunk  if all positions have been hit ', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });

});