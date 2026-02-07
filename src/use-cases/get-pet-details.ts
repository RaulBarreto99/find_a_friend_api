import { Pet } from "../generated/prisma"
import { PetsRepository } from "../repositories/pets-repository"
import { petNotFoundError } from "./errors/pet-not-found-error"

interface GetPetDetailsUseCaseRequest {
    pet_id: string
}

interface GetPetDetailsUseCaseResponse {
    pet: Pet
}

export class GetPetDetailsUseCase {

    constructor(
        private petRepository: PetsRepository,
    ) { }

    async execute({
        pet_id
    }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {

        const pet = await this.petRepository.findById(pet_id)

        if (!pet) {
            throw new petNotFoundError()
        }

        return { pet }
    }
}