import Character from './Character';

export default class Daemon extends Character {
    constructor(level: number, type = 'daemon') {
        super(level, type);
        this.attack = 10;
        this.defence = 40;
        this.attackRange = 4;
        this.movementDistance = 1;
    }
}
