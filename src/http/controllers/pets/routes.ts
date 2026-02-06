import { FastifyInstance } from "fastify";
import { registerPets } from "./register-pets";
import { fetchPetsCaracteristicsFilter } from "./fetch-pets-caracteristics-filter";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', registerPets)
    app.get('/pets/:city', fetchPetsCaracteristicsFilter)
}