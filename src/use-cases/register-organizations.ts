import { hash } from "bcryptjs"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { emailAlreadyExistsError } from "./errors/email-already-exists-error"

interface RegisterOrganizationsUseCaseRequest {
    email: string,
    password: string,
    title: string,
    description?: string | null,
    address: string,
    zip_code: string,
    whatsapp: string,
    accountable: string
}

export class RegisterOrganizationsUseCase {

    constructor( private organizationRepository: OrganizationsRepository ){}

    async execute({
        email,
        password,
        title,
        description,
        address,
        zip_code,
        whatsapp,
        accountable,
    }: RegisterOrganizationsUseCaseRequest) {

        const password_hash = await hash(password, 6)

        const organizationWithSameEmail = await this.organizationRepository.findByEmail(email)

        if (organizationWithSameEmail) {
            throw new emailAlreadyExistsError()
        }

        await this.organizationRepository.create({
            email,
            password_hash,
            title,
            description: description ?? null,
            address,
            zip_code,
            whatsapp,
            accountable
        })
    }
}