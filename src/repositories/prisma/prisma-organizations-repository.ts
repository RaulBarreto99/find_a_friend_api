import { Organization, Prisma } from "../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { OrganizationsRepository } from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = await prisma.organization.create({
            data,
        })

        return organization
    }

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email,
            }
        })

        return organization
    }

    async findById(organization_id: string): Promise<Organization | null> {
        const organization = await prisma.organization.findFirst({
            where:{
                id: organization_id
            }
        })
        
        return organization
    }
}