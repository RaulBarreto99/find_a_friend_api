import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { FetchPetsCaracteristicsFilterUseCase } from "./fetch-pets-caracteristics-filter";

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsCaracteristicsFilterUseCase

describe('Fetch Pets Caracteristics Filter Use Case', () => {

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository()
        sut = new FetchPetsCaracteristicsFilterUseCase(petsRepository)
    })

    it("Should be able to list pets in a city", async () => {
    
            await petsRepository.create({
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
    
            await petsRepository.create({
                name: "bia2",
                description: "test2",
                age: "filhote",
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

    it("Should be able to list pets filtered by age", async () => {

        await petsRepository.create({
            name: "bia",
            description: "test",
            age: "test",
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
            age: "test2",
            size: "test2",
            energy: "test2",
            independence: "test2",
            enviroment: "test2",
            city: "test2",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        const { pets } = await sut.execute({
            city: 'test',
            age: 'test',
            page: 1,
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia' }),
        ])
    })

    it("Should be able to list pets filtered by age and size", async () => {

        await petsRepository.create({
            name: "bia",
            description: "test",
            age: "test",
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
            age: "test2",
            size: "test2",
            energy: "test2",
            independence: "test2",
            enviroment: "test2",
            city: "test2",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        const { pets } = await sut.execute({
            city: 'test',
            age: 'test',
            size: 'test',
            page: 1,
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia' }),
        ])
    })

    it("Should be able to list pets filtered by age, size and energy", async () => {

        await petsRepository.create({
            name: "bia",
            description: "test",
            age: "test",
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
            age: "test2",
            size: "test2",
            energy: "test2",
            independence: "test2",
            enviroment: "test2",
            city: "test2",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        const { pets } = await sut.execute({
            city: 'test',
            age: 'test',
            size: 'test',
            energy: 'test',
            page: 1,
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia' }),
        ])
    })

    it("Should be able to list pets filtered by age, size, energy and independence", async () => {

        await petsRepository.create({
            name: "bia",
            description: "test",
            age: "test",
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
            age: "test2",
            size: "test2",
            energy: "test2",
            independence: "test2",
            enviroment: "test2",
            city: "test2",
            photos: {},
            requirements: {},
            organization_id: "org-01"
        })

        const { pets } = await sut.execute({
            city: 'test',
            age: 'test',
            size: 'test',
            energy: 'test',
            independence: 'test',
            page: 1,
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({ name: 'bia' }),
        ])
    })

})