import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrganizationsRepository } from "../../../../src/repositories/prisma/prisma-organizations-repository";
import { GetOrganizationProfileUseCase } from "../../../use-cases/get-organization-profile";
import { resourceNotFoundError } from "../../../use-cases/errors/resource-not-foud-error";

export async function getOrganizationProfile(request: FastifyRequest, reply: FastifyReply) {
    const getOrganizationProfileBodySchema = z.object({
        organizationId: z.string(),
    })

    const { organizationId } = getOrganizationProfileBodySchema.parse(request.body)

    try {
        const organizationsRepository = new PrismaOrganizationsRepository()
        const getOrganizationProfileUseCase = new GetOrganizationProfileUseCase(organizationsRepository)

        await getOrganizationProfileUseCase.execute({
            organizationId
        })
    } catch (err) {

        if (err instanceof resourceNotFoundError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}