import { Pet } from "../generated/prisma"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { PetsRepository } from "../repositories/pets-repository"
import { organizationNotExistsError } from "./errors/organization-not-exists-error"

interface RegisterPetsUseCaseRequest {
    name: string
    description?: string
    birthday?: Date
    size?: string
    energy?: string
    independence?: string
    enviroment?: string
    city: string
    photos?: any
    requirements?: any
    organization_id: string
}

interface RegisterPetsUseCaseResponse{
    pet: Pet
}

export class RegisterPetsUseCase {

    constructor(
        private petRepository: PetsRepository,
        private organizationRepository: OrganizationsRepository
    ) { }

    async execute({
        name,
        description,
        birthday,
        size,
        energy,
        independence,
        enviroment,
        city,
        photos,
        requirements,
        organization_id,
    }: RegisterPetsUseCaseRequest): Promise<RegisterPetsUseCaseResponse> {

        const organizationExists = await this.organizationRepository.findById(organization_id)

        if (!organizationExists) {
            throw new organizationNotExistsError()
        }

        const pet = await this.petRepository.create({
            name,
            city,
            organization_id,

            ...(description !== undefined && { description }),
            ...(birthday !== undefined && { birthday }),
            ...(size !== undefined && { size }),
            ...(energy !== undefined && { energy }),
            ...(independence !== undefined && { independence }),
            ...(enviroment !== undefined && { enviroment }),
            ...(photos !== undefined && { photos }),
            ...(requirements !== undefined && { requirements }),
        })

        return { pet }
    }
}

