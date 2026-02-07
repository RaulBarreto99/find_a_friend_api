import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPetsRepository } from "../../../../src/repositories/prisma/prisma-pets-repository"
import { FetchPetsCaracteristicsFilterUseCase } from "../../../use-cases/fetch-pets-caracteristics-filter"

export async function fetchPetsCaracteristicsFilter(request: FastifyRequest, reply: FastifyReply) {

    const fetchPetsCaracteristicsFilterQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        city: z.string(),
        age: z.string().optional(),
        size: z.string().optional(),
        energy: z.string().optional(),
        independence: z.string().optional(),
    })

    const { page, city, age, size, energy, independence } = fetchPetsCaracteristicsFilterQuerySchema.parse(request.query)

    const petRepository = new PrismaPetsRepository()
    const fetchPetsCaracteristicsFilterUseCase = new FetchPetsCaracteristicsFilterUseCase(petRepository)


    const { pets } = await fetchPetsCaracteristicsFilterUseCase.execute({
        city,
        page,
        ...(age !== undefined && { age }),
        ...(size !== undefined && { size }),
        ...(energy !== undefined && { energy }),
        ...(independence !== undefined && { independence }),
    })

    return reply.status(200).send({
        pets,
    })
}