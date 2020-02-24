const strokeGrid = (context, originX, originY, rowCount, columnCount, squareLength) => {
  const width = squareLength * columnCount;
  const height = squareLength * rowCount;

  context.beginPath();
  let startX = originX;
  let startY = originY;
  for (let i = 0; i <= columnCount; i += 1) {
    const endY = startY + height;
    context.moveTo(startX, startY);
    context.lineTo(startX, endY);
    startX += squareLength;
  }

  startX = originX;
  startY = originY;
  for (let i = 0; i <= rowCount; i += 1) {
    const endX = startX + width;
    context.moveTo(startX, startY);
    context.lineTo(endX, startY);
    startY += squareLength;
  }

  context.stroke();
};

const mouseDownChangeScopeFactory = (canvas, battleCanvas) => ((event) => {
  const gridLength = Math.min(canvas.clientWidth, canvas.clientHeight);
  const squareLength = gridLength / 10;
  const startX = (canvas.clientWidth - gridLength) / 2;
  const startY = (canvas.clientHeight - gridLength) / 2;
  const endX = startX + gridLength;
  const endY = startY + gridLength;

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const inside1 = startX <= mouseX && mouseX <= endX;
  const inside2 = startY <= mouseY && mouseY <= endY;
  const inside = inside1 && inside2;

  if (inside) {
    const originWidth = mouseX - startX;
    const originHeight = mouseY - startY;
    const row = Math.trunc(originHeight / squareLength);
    const column = Math.trunc(originWidth / squareLength);
    battleCanvas.scopeRow = row;
    battleCanvas.scopeColumn = column;
    if (battleCanvas.onscopechange !== null) {
      battleCanvas.onscopechange(row, column);
    }
    battleCanvas.render();
  }
});

class BattleCanvas {
  reset() {
    this.showScope = false;
    this.showShips = false;
    this.gameboard = null;
    this.scopeRow = 0;
    this.scopeColumn = 0;
  }

  constructor(canvas, icons) {
    const {
      waterDropletIcon,
      explosionIcon,
      targetScopeIcon,
    } = icons;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.waterDropletIcon = waterDropletIcon;
    this.explosionIcon = explosionIcon;
    this.targetScopeIcon = targetScopeIcon;
    this.context = canvas.getContext('2d');

    this.showScope = false;
    this.showShips = false;
    this.showIcons = false;

    this.rowCount = 10;
    this.columnCount = 10;

    this.gameboard = null;
    this.onscopechange = null;

    canvas.onmousedown = mouseDownChangeScopeFactory(canvas, this);
    this.reset();
  }

  setScopeCoordinates(row, column) {
    this.scopeRow = row;
    this.scopeColumn = column;
  }

  render() {
    const { width } = this.canvas;
    const { height } = this.canvas;
    const { clientWidth } = this.canvas;
    const { clientHeight } = this.canvas;

    if (width !== clientWidth || height !== clientHeight) {
      this.canvas.width = clientWidth;
      this.canvas.height = clientHeight;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const columnLength = this.canvas.width / this.columnCount;
    const rowLength = this.canvas.height / this.rowCount;
    const squareLength = Math.min(columnLength, rowLength);
    const gridWidth = squareLength * this.columnCount;
    const gridHeight = squareLength * this.rowCount;
    const originX = (this.canvas.width - gridWidth) / 2;
    const originY = (this.canvas.height - gridHeight) / 2;
    strokeGrid(
      this.context,
      originX,
      originY,
      this.rowCount,
      this.columnCount,
      squareLength,
    );

    if (this.gameboard !== null) {
      if (this.showShips === true) {
        this.context.save();
        this.context.strokeStyle = '#CCC';
        this.context.lineCap = 'round';
        this.context.lineWidth = squareLength * 0.75;
        for (let i = 0; i < this.gameboard.ships.length; i += 1) {
          const shipEntry = this.gameboard.ships[i];
          const halfLength = squareLength / 2;
          const startX = originX + shipEntry.column * squareLength + halfLength;
          const startY = originY + shipEntry.row * squareLength + halfLength;
          this.context.beginPath();
          this.context.moveTo(startX, startY);

          if (shipEntry.orientation === 'HORIZONTAL') {
            const endX = startX + (shipEntry.ship.length - 1) * squareLength;
            const endY = startY;
            this.context.lineTo(endX, endY);
          } else if (shipEntry.orientation === 'VERTICAL') {
            const endX = startX;
            const endY = startY + (shipEntry.ship.length - 1) * squareLength;
            this.context.lineTo(endX, endY);
          }
          this.context.stroke();
        }
        this.context.restore();
      }

      if (this.showIcons === true) {
        this.context.save();
        let ratio = squareLength / this.explosionIcon.width;
        this.context.scale(ratio, ratio);
        for (let i = 0; i < this.gameboard.hits.length; i += 1) {
          const [row, column] = this.gameboard.hits[i];
          const x = originX + (squareLength * column);
          const y = originY + (squareLength * row);
          this.context.drawImage(this.explosionIcon, x / ratio, y / ratio);
        }
        this.context.restore();

        this.context.save();
        ratio = squareLength / this.waterDropletIcon.width;
        this.context.scale(ratio, ratio);
        for (let i = 0; i < this.gameboard.misses.length; i += 1) {
          const [row, column] = this.gameboard.misses[i];
          const x = originX + (squareLength * column);
          const y = originY + (squareLength * row);
          this.context.drawImage(this.waterDropletIcon, x / ratio, y / ratio);
        }
        this.context.restore();
      }
    }

    if (this.showScope) {
      const scopeX = originX + (this.scopeColumn * squareLength);
      const scopeY = originY + (this.scopeRow * squareLength);
      const ratio = squareLength / this.targetScopeIcon.width;
      this.context.save();
      this.context.scale(ratio, ratio);
      this.context.drawImage(this.targetScopeIcon, scopeX / ratio, scopeY / ratio);
      this.context.restore();
    }
  }
}

const battleCanvasFactory = (canvas, gameboard) => new BattleCanvas(canvas, gameboard);

export default battleCanvasFactory;
