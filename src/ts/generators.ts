import Character from "./Character";
import Team from "./Team";

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes: any[], maxLevel: number): any {
    // TODO: write logic here
    while (true) {
        const characterIndex: number = Math.floor(Math.random() * allowedTypes.length);
        let characterLevel: number = Math.floor(Math.random() * maxLevel);
        if (!characterLevel) {
            characterLevel = 1;
        }
        const char = new allowedTypes[characterIndex](characterLevel);
        yield char;
    }
}

export function generateTeam(allowedTypes: any[], maxLevel: number, characterCount: number): any[] {
    // TODO: write logic here
    const team: any[] = [];
    const iterator = characterGenerator(allowedTypes, maxLevel);
    while (true) {       
        if (team.length === characterCount) {
            break;
        }
        const character = iterator.next().value;
        team.push(character);
    }
    return team;
}
