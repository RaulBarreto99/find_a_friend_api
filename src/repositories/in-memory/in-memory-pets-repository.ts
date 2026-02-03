import { randomUUID } from "node:crypto";
import { Prisma, Pet } from "../../generated/prisma";
import { PetsRepository } from "../pets-repository";
import { JsonValue } from "../../generated/prisma/runtime/library";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet: Pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            birthday: data.birthday ? new Date(data.birthday) : null,
            size: data.size ?? null,
            energy: data.energy ?? null,
            independence: data.independence ?? null,
            enviroment: data.enviroment ?? null,
            city: data.city as string,
            photos: data.photos as any,
            requirements: data.requirements as any,
            organization_id: data.organization_id as string,
            created_at: new Date()
        }

        this.items.push(pet)

        return pet
    }

    async findManyByCity(city: string, page: number) {
        return this.items
            .filter((item) => item.city === city)
            .slice((page - 1) * 20, page * 20)
    }
}