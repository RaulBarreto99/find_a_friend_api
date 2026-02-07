import { FastifyInstance } from "fastify";
import { registerPets } from "./register-pets";
import { fetchPetsCaracteristicsFilter } from "./fetch-pets-caracteristics-filter";
import { getPetDetails } from "./get-pets-details";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', registerPets)
    app.get('/pets/search', fetchPetsCaracteristicsFilter)
    app.get('/pets/:petId', getPetDetails)
}