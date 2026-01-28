import { randomUUID } from "node:crypto";
import { Prisma, Organization } from "../../generated/prisma";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: Organization[] = []

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = {
            id: data.id ?? randomUUID(),
            email: data.email,
            password_hash: data.password_hash,
            title: data.title,
            description: data.description ?? null,
            address: data.address,
            zip_code: data.zip_code,
            whatsapp: data.whatsapp,
            accountable: data.accountable,
            created_at: new Date()
        }

        this.items.push(organization)

        return organization
    }

    async findById(organization_id: string) {
        const organization = this.items.find(item => (item.id === organization_id))

        if (!organization) {
            return null
        }

        return organization
    }

    async findByEmail(email: string) {
        const organization = this.items.find(item => (item.email === email))

        if (!organization) {
            return null
        }

        return organization
    }
}