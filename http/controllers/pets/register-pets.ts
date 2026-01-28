import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { RegisterPetsUseCase } from "../../../src/use-cases/register-pets"
import { PrismaPetsRepository } from "../../../src/repositories/prisma/prisma-pets-repository"
import { PrismaOrganizationsRepository } from "../../../src/repositories/prisma/prisma-organizations-repository"

export async function registerPets(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        birthday: z.coerce.date().optional(),
        size: z.string().optional(),
        energy: z.string().optional(),
        independence: z.string().optional(),
        enviroment: z.string().optional(),
        photos: z.any().optional(),
        requirements: z.any().optional(),
        organization_id: z.string(),
    })

    const { name, description, birthday, size, energy, independence, enviroment, photos, requirements, organization_id } = registerBodySchema.parse(request.body)

    try {
        const petRepository = new PrismaPetsRepository()
        const organizationRepository = new PrismaOrganizationsRepository()
        const registerPetsUseCase = new RegisterPetsUseCase(petRepository, organizationRepository)


        await registerPetsUseCase.execute({
            name,
            organization_id,

            ...(description !== undefined && { description }),
            ...(birthday !== undefined && { birthday }),
            ...(size !== undefined && { size }),
            ...(energy !== undefined && { energy }),
            ...(independence !== undefined && { independence }),
            ...(enviroment !== undefined && { enviroment }),
            ...(photos !== undefined && { photos }),
            ...(requirements !== undefined && { requirements }),
        })
    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}