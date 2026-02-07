import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { GetPetDetailsUseCase } from "../../../use-cases/get-pet-details";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { petNotFoundError } from "../../../use-cases/errors/pet-not-found-error";

export async function getPetDetails(request: FastifyRequest, reply: FastifyReply) {
    const getPetDetailsParamsSchema = z.object({
        petId: z.string(),
    })

    const { petId } = getPetDetailsParamsSchema.parse(request.params)

    let pet

    try {
        const petsRepository = new PrismaPetsRepository()
        const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository)

        pet = await getPetDetailsUseCase.execute({
            pet_id: petId
        })
    } catch (err) {

        if (err instanceof petNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send({
        pet,
    })
}