import tooltip from '../tooltip';
import Bowman from '../Bowman';

test('Should be character info string', () => {
    const bowman = new Bowman(2);
    expect(tooltip(bowman)).toBe('🎖2 ⚔25 🛡25 ❤50');
});