import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { invalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

    beforeEach(async () => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new AuthenticateUseCase(organizationsRepository)

        await organizationsRepository.create({
            id: "org-01",
            email: "org@live.com",
            password_hash: await hash('123456', 6),
            title: "org",
            description: "test",
            address: "test",
            zip_code: "test",
            whatsapp: "test",
            accountable: "test"
        })
    })


    it("Should be able to authenticate", async () => {

        const { organization } = await sut.execute({
            email: 'org@live.com',
            password: '123456',
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it("Should not be able to authenticate with wrong email", async () => {

        await expect(() =>
            sut.execute({
                email: 'org1@live.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(invalidCredentialsError)
    })

    it("Should not be able to authenticate with wrong password", async () => {

        await expect(() =>
            sut.execute({
                email: 'org@live.com',
                password: '1234567',
            })
        ).rejects.toBeInstanceOf(invalidCredentialsError)
    })

})