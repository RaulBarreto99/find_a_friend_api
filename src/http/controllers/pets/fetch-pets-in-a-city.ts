import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPetsRepository } from "../../../../src/repositories/prisma/prisma-pets-repository"
import { FetchPetsInACityUseCase } from "../../../use-cases/fetch-pets-in-a-city"

export async function fetchPetsInACity(request: FastifyRequest, reply: FastifyReply) {

    const fetchPetsInACityParamsSchema = z.object({
        city: z.string(),
    })

    const fetchPetsInACityQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { city } = fetchPetsInACityParamsSchema.parse(request.params)
    const { page } = fetchPetsInACityQuerySchema.parse(request.query)

    const petRepository = new PrismaPetsRepository()
    const fetchPetsInACityUseCase = new FetchPetsInACityUseCase(petRepository)


    const { pets } = await fetchPetsInACityUseCase.execute({ city, page })

    return reply.status(200).send({
        pets,
    })
}