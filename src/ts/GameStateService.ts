export default class GameStateService {
    storage: any;
    constructor(storage: any) {
        this.storage = storage;
    }

    save(state: object): void {
        this.storage.setItem('state', JSON.stringify(state));
    }

    load() : object {
        try {
            return JSON.parse(this.storage.getItem('state'));
        } catch (e) {
            throw new Error('Invalid state');
        }
    }
}
