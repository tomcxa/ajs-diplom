import Character from './Character';

export default class Vampire extends Character {
    constructor(level: number, type = 'vampire') {
        super(level, type);
        this.attack = 40;
        this.defence = 10;
        this.attackRange = 2;
        this.movementDistance = 2;
    }
}
