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
            age: data.age ?? null,
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

    async findManyByCaracteristics(data: Prisma.PetWhereInput, page: number) {
        return this.items
            .filter((item) => {
                if (data.city && item.city !== data.city) return false
                if (data.age && item.age !== data.age) return false
                if (data.size && item.size !== data.size) return false
                if (data.energy && item.energy !== data.energy) return false
                if (data.independence && item.independence !== data.independence) return false

                return true
            })
            .slice((page - 1) * 20, page * 20)
    }
}