import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { RegisterPetsUseCase } from "./register-pets";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { petNotFoundError } from "./errors/pet-not-found-error";

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new GetPetDetailsUseCase(petsRepository)

        await organizationsRepository.create({
            id: "org-01",
            email: "org7@live.com",
            password_hash: "123456",
            title: "org",
            description: "test",
            address: "test",
            zip_code: "test",
            whatsapp: "test",
            accountable: "test"
        })

        await petsRepository.create({
            id: "pet-01",
            name: "bia",
            description: "test",
            age: "filhote",
            size: "test",
            energy: "test",
            independence: "test",
            enviroment: "test",
            city: "test",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })
    })

    it("Should be able to get pet details", async () => {

        const { pet } = await sut.execute({
            pet_id: "pet-01",
        })

        expect(pet.id).toEqual(expect.any(String))
    })

    it("Should not be able to get pet details with wrong id", async () => {

        await expect(() =>
            sut.execute({
                pet_id: 'non-existing-id',
            })
        ).rejects.toBeInstanceOf(petNotFoundError)
    })

})