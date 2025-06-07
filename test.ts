
function getMinMove(start: string,
    target: string,
    brokenTiles: string[]
): number {

    const directions = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
    ];

    const isInBounds = (x: number, y: number) =>
        x >= 0 && x < 8 && y >= 0 && y < 8;

    const toCoord = (pos: string): [number, number] => {
        const file = pos[0].toLowerCase();
        const rank = parseInt(pos[1], 10);
        return [file.charCodeAt(0) - "a".charCodeAt(0), rank - 1]; // x, y
    };

    const brokenSet = new Set<string>();
    for (const tileGroup of brokenTiles) {
        for (const tile of tileGroup.split(",")) {
            brokenSet.add(tile.trim().toLowerCase());
        }
    }

    const visited = new Set<string>();
    const queue: Array<[[number, number], number]> = [[toCoord(start), 0]];
    const targetCoord = toCoord(target);

    while (queue.length > 0) {
        const [[x, y], moves] = queue.shift()!;
        const posStr = `${String.fromCharCode(x + 97)}${y + 1}`;

        if (x === targetCoord[0] && y === targetCoord[1]) {
            return moves;
        }

        if (visited.has(posStr) || brokenSet.has(posStr)) continue;
        visited.add(posStr);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (isInBounds(nx, ny)) {
                const nextStr = `${String.fromCharCode(nx + 97)}${ny + 1}`;
                if (!visited.has(nextStr) && !brokenSet.has(nextStr)) {
                    queue.push([[nx, ny], moves + 1]);
                }
            }
        }
    }

    return -1; // Target not reachable
}

console.log(getMinMove("d7", "h8", ["f6,f7,f8"]));
