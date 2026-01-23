import { OrganizationsRepository } from "../repositories/organizations-repository"
import { PetsRepository } from "../repositories/pets-repository"

interface RegisterPetsUseCaseRequest {
    name: string,
    description?: string | null,
    birthday: Date,
    size: string,
    energy: string,
    independence: string,
    enviroment: string,
    photos?: any,
    requirements: string[],
    organization_id: string,
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
        photos,
        requirements,
        organization_id,
    }: RegisterPetsUseCaseRequest) {

        const organizationExists = await this.organizationRepository.finById(organization_id)

        if (!organizationExists) {
            throw new Error('Organization not exists.')
        }

        await this.petRepository.create({
            name,
            description: description ?? null,
            birthday,
            size,
            energy,
            independence,
            enviroment,
            photos,
            requirements,
            organization_id,
        })
    }
}

