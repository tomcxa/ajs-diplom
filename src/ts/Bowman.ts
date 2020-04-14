import Character from './Character';

export default class Bowman extends Character {
    constructor(level: number, type = 'bowman') {
        super(level, type);
        this.attack = 25;
        this.defence = 25;
        this.attackRange = 2;
        this.movementDistance = 2;
    }
}
