import Character from './Character';

export default class Undead extends Character {
    constructor(level: number, type = 'undead') {
        super(level, type);
        this.attack = 25;
        this.defence = 25;
        this.attackRange = 1;
        this.movementDistance = 4;
    }
}
