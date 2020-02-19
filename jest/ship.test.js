
const ship1 = ship(5, [6, 7, 8]);
describe('Ship factory function', () => {
  test('should have correct properties', () => {
    expect(ship1).toMatchObject({
      length: expect.any(Number),
      isSunk: expect.any(Function),
    });
  });


  test('should verify the length property', () => {
    expect(ship1.length).toBe(4);
  });
});

describe('Hit function', () =>{
  test('should remove element if it is in the position array', () => {
    expect(ship1.hit(6)).toBe(true);
  });

  test('should return false if there is element in the position array', () => {
    expect(ship1.isSunk()).toBe(false);
  });

  test('should return false if not in the array', () => {
    expect(ship1.hit(70)).toBe(false);
  });

  test('should return true if position array is empty', () => {
    expect(ship1.isSunk()).toBe(true);
  });
});