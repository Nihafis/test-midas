function getMinMove(startPos: string, endPos: string, blocked: string[]): number {
    const knightSteps = [
      [1, 2], [2, 1], [-1, 2], [-2, 1],
      [-1, -2], [-2, -1], [1, -2], [2, -1],
    ];
  
    function toXY(pos: string): [number, number] {
      const col = pos[0].toLowerCase().charCodeAt(0) - 97;
      const row = 8 - parseInt(pos[1]); 
      return [col, row];
    }
  
    function inBoard(x: number, y: number): boolean {
      return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
  
    const blockedTiles = new Set<string>();
    blocked.forEach(tile => {
      blockedTiles.add(tile.trim().toLowerCase());
    });
  
    const [startX, startY] = toXY(startPos);
    const [targetX, targetY] = toXY(endPos);
  
    const visited = new Set<string>();
    const queue: Array<[[number, number], number]> = [[[startX, startY], 0]];
  
    for (let i = 0; i < queue.length; i++) {
      const [[x, y], step] = queue[i];
      const currentKey = `${String.fromCharCode(97 + x)}${8 - y}`;
  
      if (x === targetX && y === targetY) {
        return step;
      }
  
      if (visited.has(currentKey) || blockedTiles.has(currentKey)) {
        continue;
      }
  
      visited.add(currentKey);
  
      for (const [dx, dy] of knightSteps) {
        const nextX = x + dx;
        const nextY = y + dy;
  
        if (inBoard(nextX, nextY)) {
          const nextKey = `${String.fromCharCode(97 + nextX)}${8 - nextY}`;
          if (!visited.has(nextKey) && !blockedTiles.has(nextKey)) {
            queue.push([[nextX, nextY], step + 1]);
          }
        }
      }
    }
  
    return -1;
  }
  
  console.log(getMinMove("d6", "h8", ["f6","f7"])); 
  