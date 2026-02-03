import { FastifyInstance } from "fastify";
import { registerOrganizations } from "./register-organizations";
import { authenticate } from "./authenticate";

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganizations)

    app.post('/sessions', authenticate)
}