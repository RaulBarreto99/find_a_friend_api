import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrganizationsRepository } from "../../../../src/repositories/prisma/prisma-organizations-repository";
import { RegisterOrganizationsUseCase } from "../../../../src/use-cases/register-organizations";
import { emailAlreadyExistsError } from "../../../../src/use-cases/errors/email-already-exists-error";

export async function registerOrganizations(request: FastifyRequest, reply: FastifyReply) {
    const registerOrganizationsBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        title: z.string(),
        description: z.string().optional(),
        address: z.string(),
        zip_code: z.string(),
        whatsapp: z.string(),
        accountable: z.string()
    })

    const { email, password, title, description, address, zip_code, whatsapp, accountable } = registerOrganizationsBodySchema.parse(request.body)

    try {
        const organizationsRepository = new PrismaOrganizationsRepository()
        const registerOrganizationsUseCase = new RegisterOrganizationsUseCase(organizationsRepository)
        
        await registerOrganizationsUseCase.execute({
            email,
            password,
            title,
            ...(description !== undefined && { description }),
            address,
            zip_code,
            whatsapp,
            accountable,
        })
    } catch (err) {

        if(err instanceof emailAlreadyExistsError){
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}