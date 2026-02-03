import { FastifyInstance } from "fastify";
import { registerPets } from "./register-pets";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', registerPets)

}