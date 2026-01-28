import { hash } from "bcryptjs"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { emailAlreadyExistsError } from "./errors/email-already-exists-error"
import { Organization } from "../generated/prisma"

interface RegisterOrganizationsUseCaseRequest {
    email: string,
    password: string,
    title: string,
    description?: string,
    address: string,
    zip_code: string,
    whatsapp: string,
    accountable: string
}

interface RegisterOrganizationsUseCaseResponse {
    organization: Organization
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
    }: RegisterOrganizationsUseCaseRequest): Promise <RegisterOrganizationsUseCaseResponse> {

        const password_hash = await hash(password, 6)

        const organizationWithSameEmail = await this.organizationRepository.findByEmail(email)

        if (organizationWithSameEmail) {
            throw new emailAlreadyExistsError()
        }

        const organization = await this.organizationRepository.create({
            email,
            password_hash,
            title,
            ...(description !== undefined && { description }),
            address,
            zip_code,
            whatsapp,
            accountable
        })

        return { organization }
    }
}