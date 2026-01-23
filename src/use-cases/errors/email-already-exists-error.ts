export class emailAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists')
    }
}