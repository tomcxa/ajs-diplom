import Character from "./Character";

export default class Team {
    private _members: Set<Character>;
    constructor() {
        this._members = new Set();
    }

    add(character: Character) {
        if (this._members.has(character)) {
            throw new Error('Персонаж уже в команде!');
        }
        this._members.add(character);
    }

    get size() {
        return this._members.size;
    }
}
