import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterPetsUseCase } from "../../../src/use-cases/register-pets"
import { PrismaPetsRepository } from "../../../src/repositories/prisma/prisma-pets-repository"
import { PrismaOrganizationsRepository } from "../../../src/repositories/prisma/prisma-organizations-repository"

export async function registerPets (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        birthday: z.coerce.date(),
        size: z.string(),
        energy: z.string(),
        independence: z.string(),
        enviroment: z.string(),
        photos: z.any().nullable(),
        requirements: z.array(z.string()),
        organization_id: z.string(),
    })

    const { name, description, birthday, size, energy, independence, enviroment, photos, requirements, organization_id } = registerBodySchema.parse(request.body)

    try {
        const petRepository = new PrismaPetsRepository()
        const organizationRepository = new PrismaOrganizationsRepository()
        const registerPetsUseCase = new RegisterPetsUseCase(petRepository, organizationRepository)


        await registerPetsUseCase.execute({
            name,
            description,
            birthday,
            size,
            energy,
            independence,
            enviroment,
            photos,
            requirements,
            organization_id,
        })
    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}