import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { RegisterPetsUseCase } from "./register-pets";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { FetchPetsInACityUseCase } from "./fetch-pets-in-a-city";

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsInACityUseCase

describe('Fetch Pets Use Case', () => {

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        sut = new FetchPetsInACityUseCase(petsRepository)
    })

    it("Should be able to list pets in a city", async () => {

        await petsRepository.create({
            name: "bia",
            description: "test",
            birthday: new Date("2001-08-14"),
            size: "test",
            energy: "test",
            independence: "test",
            enviroment: "test",
            city: "test",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        await petsRepository.create({
            name: "bia2",
            description: "test2",
            birthday: new Date("2001-08-14"),
            size: "test2",
            energy: "test2",
            independence: "test2",
            enviroment: "test2",
            city: "test",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        const { pets } = await sut.execute({
            city: 'test',
            page: 1,
        })

        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia' }),
            expect.objectContaining({ name: 'bia2' }),
        ])
    })

    it('should be able to fetch paginated list pets in a city', async () => {

        for (let i = 1; i <= 22; i++) {
            await petsRepository.create({
                name: `bia-${i}`,
                description: "test",
                birthday: new Date("2001-08-14"),
                size: "test",
                energy: "test",
                independence: "test",
                enviroment: "test",
                city: "test",
                photos: {},
                requirements: {},
                organization_id: "org-01"
            })
        }

        const { pets } = await sut.execute({
            city: 'test',
            page: 2,
        })

        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia-21' }),
            expect.objectContaining({ name: 'bia-22' }),
        ])
    })

})