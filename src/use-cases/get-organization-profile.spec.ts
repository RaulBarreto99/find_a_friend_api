import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationsRepository } from "../repositories/in-memory/in-memory-organizations-repository";
import { hash } from "bcryptjs";
import { GetOrganizationProfileUseCase } from "./get-organization-profile";
import { resourceNotFoundError } from "./errors/resource-not-foud-error";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationProfileUseCase

describe('Get organization profile Use Case', () => {

    beforeEach(async () => {
        organizationsRepository = new InMemoryOrganizationsRepository()
        sut = new GetOrganizationProfileUseCase(organizationsRepository)

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


    it("Should be able to get organization profile", async () => {

        const { organization } = await sut.execute({
            organizationId: 'org-01',
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it("Should not be able to get organization profile with wrong id", async () => {

        await expect(() =>
            sut.execute({
                organizationId: 'non-existing-id',
            })
        ).rejects.toBeInstanceOf(resourceNotFoundError)
    })

})