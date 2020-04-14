export default class Character {
    level: number;
    attack: number;
    defence: number;
    health: number;
    type: string;
    attackRange: number;
    movementDistance: number;

    protected constructor(level: number, type = 'generic') {
        this.level = level;
        this.attack = 0;
        this.defence = 0;
        this.health = 50;
        this.type = type;
        this.attackRange = 0;
        this.movementDistance = 0;
        // TODO: throw error if user use "new Character()"
        // if (new.target === Character) throw new Error('the Character class constructor is not available');
    }

    levelUp(): void {
        this.level += 1;
        this.health = this.health > 100 ? 100 : this.health + 80;
        this.attack = Math.max(this.attack, this.attack * (1.8 - this.health / 100));
        this.defence = Math.max(this.defence, this.defence * (1.8 - this.health / 100));
    }

    move(from: number, to: number): void {
        from = to;
    }
}
