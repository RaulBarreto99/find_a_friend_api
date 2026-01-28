import { Organization, Prisma } from "../generated/prisma"

export interface OrganizationsRepository {
    create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
    findByEmail(email: string): Promise<Organization | null >
    findById(organization_id: string): Promise<Organization | null>
}