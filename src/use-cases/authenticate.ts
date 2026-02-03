import { compare } from "bcryptjs";
import { OrganizationsRepository } from "../repositories/organizations-repository";
import { invalidCredentialsError } from "./errors/invalid-credentials-error";
import { Organization } from "../generated/prisma";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    organization: Organization
}

export class AuthenticateUseCase {
    constructor(
        private organizationRepository: OrganizationsRepository,
    ) { }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const organization = await this.organizationRepository.findByEmail(email)

        if (!organization) {
            throw new invalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, organization.password_hash)

        if (!doesPasswordMatches) {
            throw new invalidCredentialsError()
        }

        return { organization }
    }
}