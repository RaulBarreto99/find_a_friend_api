export class organizationNotExistsError extends Error {
    constructor() {
        super('Organization not exists.')
    }
}