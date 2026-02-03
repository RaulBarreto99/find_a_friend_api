import { FastifyInstance } from "fastify";
import { registerPets } from "./register-pets";
import { fetchPetsInACity } from "./fetch-pets-in-a-city";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', registerPets)
    app.get('/pets/:city', fetchPetsInACity)
}