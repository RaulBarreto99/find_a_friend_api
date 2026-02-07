export class petNotFoundError extends Error {
    constructor() {
        super('Pet not found.')
    }
}