import { FastifyInstance } from "fastify";
import { registerOrganizations } from "./register-organizations";

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganizations)
}