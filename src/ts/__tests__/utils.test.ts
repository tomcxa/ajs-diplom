import { calcTileType, calcHealthLevel } from '../utils';

describe('utils functions test for 8x8 boarder size', () => {
    test('calcTitleType should return cell map name', () => {
        expect(calcTileType(0, 8)).toBe('top-left');
        expect(calcTileType(7, 8)).toBe('top-right');
        expect(calcTileType(5, 8)).toBe('top');
        expect(calcTileType(56, 8)).toBe('bottom-left');
        expect(calcTileType(63, 8)).toBe('bottom-right');
        expect(calcTileType(60, 8)).toBe('bottom');
        expect(calcTileType(15, 8)).toBe('right');
        expect(calcTileType(8, 8)).toBe('left');
        expect(calcTileType(10, 8)).toBe('center');
    });
    test('calcHealthLevel should return string helth info', () => {
        expect(calcHealthLevel(8)).toBe('critical');
        expect(calcHealthLevel(25)).toBe('normal');
        expect(calcHealthLevel(100)).toBe('high');
    });
});
