import { Pet } from "../generated/prisma"
import { PetsRepository } from "../repositories/pets-repository"

interface FetchPetsCaracteristicsFilterUseCaseRequest {
    city: string
    page: number
    age?: string
    size?: string
    energy?: string
    independence?: string
}

interface FetchPetsCaracteristicsFilterUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsCaracteristicsFilterUseCase {

    constructor(
        private petRepository: PetsRepository,
    ) { }

    async execute({
        city,
        page,
        age,
        size,
        energy,
        independence
    }: FetchPetsCaracteristicsFilterUseCaseRequest): Promise<FetchPetsCaracteristicsFilterUseCaseResponse> {

        const pets = await this.petRepository.findManyByCaracteristics({
            city,

            ...(age !== undefined && { age }),
            ...(size !== undefined && { size }),
            ...(energy !== undefined && { energy }),
            ...(independence !== undefined && { independence }),
        }, page)

        return { pets }
    }
}