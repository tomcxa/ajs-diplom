export function calcColumnSideCoords(start: number, end: number, boardSize: number): number[] {
    const sideCoords: number[] = [];
    for (let i = start + boardSize; i < end; i += boardSize) {
        sideCoords.push(i);
    }
    return sideCoords;
}

export function calcAvailableStartPosition(start: number, boardSize: number): number[] {
    const teamStartPosition: number[] = [];
    for (let i = start; i < boardSize ** 2; i += boardSize) {
        teamStartPosition.push(i);
    }
    for (let i = start + 1; i < boardSize ** 2; i += boardSize) {
        teamStartPosition.push(i);
    }
    return teamStartPosition;
}

export function calcAvailableAttackCoords(boardSize: number, attackRange: number, from: number, to: number): number[] {
    const availableCoords: number[] = [];
    const leftBoardBorder: number[] = [];
    for (let i = 0; i <= boardSize ** 2 - boardSize; i += boardSize) {
        leftBoardBorder.push(i);
    }
    const rightBoardBorder: number[] = [];
    for (let i = boardSize - 1; i < boardSize ** 2; i += boardSize) {
        rightBoardBorder.push(i);
    }
    const topBoardBorder: number[] = [];
    for (let i = 0; i < boardSize; i++) {
        topBoardBorder.push(i);
    }
    const bottomBoardBorder: number[] = [];
    for (let i = boardSize ** 2 - boardSize; i < boardSize ** 2; i++) {
        bottomBoardBorder.push(i);
    }
    //вычисляем левый верхний угол
    let topLeftAngle: number = (from - attackRange) - (boardSize * attackRange);
    //теперь вычисляем верхние, нижние, левые и правые массивы координат относительно центра
    
    function calcRaw(start: number): number[] {
        const end = start + (boardSize * attackRange * 2);
        const raw: number[] = [];
        for (let i = start; i <= end; i += boardSize) {
            raw.push(i);
        }
        for (let i = 1; i < attackRange; i++) {
            const nextRaw = raw.map(num => num + i);
            raw.push(...nextRaw);
        }
        return raw;
    }

    const leftArray: number[] = calcRaw(topLeftAngle).filter((el, index) => {
        // if (el <= leftBoardBorder[index]) return false;
        return el <= leftBoardBorder[index];
    });
    
    console.log(leftArray);
    // console.log(rightBoardBorder)
    // console.log(topBoardBorder)
    // console.log(bottomBoardBorder)
    return availableCoords;
}

export function calcTileType(index: number, boardSize: number): string {
    // TODO: write logic here
    const angleCoords = Object.create(null);
    angleCoords.boardSize = boardSize;
    angleCoords.topLeft = 0;
    angleCoords.topRight = angleCoords.boardSize - 1;
    angleCoords.bottomLeft = angleCoords.boardSize ** 2 - angleCoords.boardSize;
    angleCoords.bottomRight = angleCoords.boardSize ** 2 - 1;

    const { topLeft, topRight, bottomLeft, bottomRight } = angleCoords;
    const someHandler = (element: number): boolean => element === index;

    if (index === topLeft) return 'top-left';
    if (index === topRight) return 'top-right';
    if (index === bottomLeft) return 'bottom-left';
    if (index === bottomRight) return 'bottom-right';
    if (index > topLeft && index < topRight) return 'top';
    if (index > bottomLeft && index < bottomRight) return 'bottom';
    if (calcColumnSideCoords(topLeft, bottomLeft, boardSize).some(someHandler)) return 'left';
    if (calcColumnSideCoords(topRight, bottomRight, boardSize).some(someHandler)) return 'right';

    return 'center';
}

export function calcHealthLevel(health: number): string {
    if (health < 15) {
        return 'critical';
    }

    if (health < 50) {
        return 'normal';
    }

    return 'high';
}
