import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrganizationsUseCase } from './register-organizations'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { emailAlreadyExistsError } from './errors/email-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationsUseCase;

describe('Register Organization Use Case', () => {

    beforeEach(()=>{
         organizationsRepository = new InMemoryOrganizationsRepository()
         sut = new RegisterOrganizationsUseCase(organizationsRepository)
    })

    it('Should be able to register', async () => {

        const { organization } = await sut.execute({
            email: "org7@live.com",
            password: "123456",
            title: "org",
            description: "test",
            address: "test",
            zip_code: "test",
            whatsapp: "test",
            accountable: "test"
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('Should hash organization password upon registration', async () => {

        const { organization } = await sut.execute({
            email: "org7@live.com",
            password: "123456",
            title: "org",
            description: "test",
            address: "test",
            zip_code: "test",
            whatsapp: "test",
            accountable: "test"
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            organization.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Should not be able to register with same email twice', async () => {

        await sut.execute({
            email: "org7@live.com",
            password: "123456",
            title: "org",
            description: "test",
            address: "test",
            zip_code: "test",
            whatsapp: "test",
            accountable: "test"
        })

        await expect(() =>
            sut.execute({
                email: "org7@live.com",
                password: "123456",
                title: "org",
                description: "",
                address: "test",
                zip_code: "test",
                whatsapp: "test",
                accountable: "test"
            })
        ).rejects.toBeInstanceOf(emailAlreadyExistsError);
    })
})