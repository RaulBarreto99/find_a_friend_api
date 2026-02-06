import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { RegisterPetsUseCase } from "./register-pets";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { organizationNotExistsError } from "./errors/organization-not-exists-error";

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterPetsUseCase

describe('Register Pet Use Case', () => {

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new RegisterPetsUseCase(petsRepository, organizationsRepository)

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
    })

    it("Should be able to register", async () => {

        const { pet } = await sut.execute({
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

        expect(pet.id).toEqual(expect.any(String))
    })

    it('Should not be able to register with an inexistent organization', async () => {

        await expect(() =>
            sut.execute({
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
                organization_id: "org-inexistent"
            })
        ).rejects.toBeInstanceOf(organizationNotExistsError)
    })
})