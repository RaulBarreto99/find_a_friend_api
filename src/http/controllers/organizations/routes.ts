import { FastifyInstance } from "fastify";
import { registerOrganizations } from "./register-organizations";
import { authenticate } from "./authenticate";
import { getOrganizationProfile } from "./get-organization-profile";

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganizations)
    app.get('/organizations/:organizationId', getOrganizationProfile)
    app.post('/sessions', authenticate)
}