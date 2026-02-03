import { Pet } from "../generated/prisma"
import { OrganizationsRepository } from "../repositories/organizations-repository"
import { PetsRepository } from "../repositories/pets-repository"
import { organizationNotExistsError } from "./errors/organization-not-exists-error"

interface FetchPetsInACityUseCaseRequest {
    city: string
    page: number
}

interface FetchPetsInACityUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsInACityUseCase {

    constructor(
        private petRepository: PetsRepository,
    ) { }

    async execute({
        city,
        page,
    }: FetchPetsInACityUseCaseRequest): Promise<FetchPetsInACityUseCaseResponse> {

        const pets = await this.petRepository.findManyByCity(city, page)

        return { pets }
    }
}