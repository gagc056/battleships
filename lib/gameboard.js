const STATUS_HIT = 1;
const STATUS_MISS = 2;

const shipCollision =  (
  shipA,
  rowA,
  columnA,
  orientationA,
  shipB,
  rowB,
  columnB,
  orientationB,
  ) => {

  if (rowA === rowB && columnA === columnB) {
    return true;
  }

  const rowC = orientationA === 'VERTICAL' ? rowA + shipA.length - 1 : rowA;
  const rowD = orientationB === 'VERTICAL' ? rowB + shipA.length - 1 : rowB;

  const columnC = orientationA === 'HORIZONTAL' ? columnA + shipA.length - 1 : columnA;
  const columnD = orientationB === 'HORIZONTAL' ? columnB + shipA.length - 1 : columnB;
  
  if  (orientationA === orientationB) {
    if (orientationA ===  'HORIZONTAL') {
      if (rowA !== rowB) {
        return false;
      } else {
        const insideA1 = columnA <= columnD && columnD <= columnC;
        const insideA2 = columnA <= columnB && columnB <= columnC;
        const insideB1 = columnB <= columnC && columnC <= columnD;
        const insideB2 = columnB <= columnA && columnA <= columnD;
        const insideA = insideA1 || insideA2;
        const insideB = insideB1 || insideB2;
        if (insideA || insideB) {
          return true;
        } else {
          return false;
        }
      }
    } else if (orientationA === 'VERTICAL') {
      if (columnA !== columnB) {
        return false;
      } else {
        const insideA1 = rowA <= rowD && rowD <= rowC;
        const insideA2 = rowA <= rowB && rowB <= rowC;
        const insideB1 = rowB <= rowC && rowC <= rowD;
        const insideB2 = rowB <= rowA && rowA <= rowD;
        const insideA = insideA1 || insideA2;
        const insideB = insideB1 || insideB2;
        if (insideA || insideB) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    const shorterLength = Math.min(shipA.length, shipB.length);
    const longerLength = Math.max(shipA.length, shipB.length);
    const minimumArea = (longerLength + 1) * shorterLength;

    const maxRow = Math.max(rowA, rowB, rowC, rowD);
    const minRow = Math.min(rowA, rowB, rowC, rowD);
    const maxColumn = Math.max(columnA, columnB, columnC, columnD);
    const minColumn = Math.min(columnA, columnB, columnC, columnD);
    const width = maxRow - minRow + 1;
    const height = maxColumn - minColumn + 1;
    const area = width * height;

    if (area < minimumArea) {
      return true;
    } else {
      return false;
    }
  }
};

const gameboardFactory = () => {
  const instance = {};
  instance.ships = [];
  instance.hits = [];
  instance.misses = [];
  instance.status = new Uint8Array(100);

  instance.placeShip = (ship, row, column, orientation) => {

    if (orientation === 'HORIZONTAL' && ship.length + column > 10) {
      return false;
    }

    if (orientation === 'VERTICAL' && ship.length + row > 10) {
      return false;
    }

    for (let i = 0; i < instance.ships.length; i += 1) {
      const shipEntry = instance.ships[i];
      const collision = shipCollision(
        shipEntry.ship,
        shipEntry.row,
        shipEntry.column,
        shipEntry.orientation,
        ship,
        row,
        column,
        orientation,
      );

      if (collision) {
        return false;
      }
    }

    instance.ships.push({
      ship: ship,
      row: row,
      column: column,
      orientation: orientation,
    });

    return true;
  }

  instance.receiveAttack = (row, column) => {
    const index = (row * 10) + column;
    for (let i = 0; i < instance.ships.length; i += 1) {
      const shipEntry = instance.ships[i];
      const rowStart = shipEntry.row;
      const rowEnd = shipEntry.row + shipEntry.ship.length;
      const columnStart = shipEntry.column;
      const columnEnd = shipEntry.column + shipEntry.ship.length;
      const insideHorizontal = columnStart <= column && column < columnEnd;
      const hitHorizontal = column - columnStart;
      const insideVertical = rowStart <= row && row < rowEnd;
      const hitVertical = row - rowStart;
      switch (shipEntry.orientation) {
        case 'HORIZONTAL':
          if (shipEntry.row === row && insideHorizontal) {
            instance.hits.push([row, column]);
            shipEntry.ship.hit(hitHorizontal);
            instance.status[index] = STATUS_HIT;
            return;
          }
          break;

        case 'VERTICAL':
          if (shipEntry.column === column && insideVertical) {
            instance.hits.push([row, column]);
            shipEntry.ship.hit(hitVertical);
            instance.status[index] = STATUS_HIT;
            return;
          }
          break;

        default:
          break;
      }
    }

    instance.misses.push([row, column]);
    instance.status[index] = STATUS_MISS;
  }

  instance.allSunk = () => {
    for (let i = 0; i < instance.ships.length; i += 1) {
      const shipEntry = instance.ships[i];
      if (shipEntry.ship.isSunk() === false) {
        return false;
      }
    }
    return true;
  };

  instance.statusAt = (row, column) => {
    const index = (row * 10) + column;
    if (instance.status[index] === STATUS_HIT) {
      return 'HIT';
    } else if (instance.status[index] === STATUS_MISS) {
      return 'MISS';
    }
    return null;
  };
  
  return instance;
}

export default gameboardFactory;
