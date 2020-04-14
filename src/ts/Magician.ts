import Character from './Character';

export default class Magician extends Character {
    constructor(level: number, type = 'magician') {
        super(level, type);
        this.attack = 25;
        this.defence = 25;
        this.attackRange = 4;
        this.movementDistance = 1;
    }
}
