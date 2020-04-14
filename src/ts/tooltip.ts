import Character from "./Character";

export default function tooltip(character: Character): string {
    const level: string = '🎖';
    const attack: string = '⚔';
    const defence: string = '🛡';
    const health: string = '❤';
    return `${level}${character.level} ${attack}${character.attack} ${defence}${character.defence} ${health}${character.health}`;
}