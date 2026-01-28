import { randomUUID } from "node:crypto";
import { Prisma, Pet } from "../../generated/prisma";
import { PetsRepository } from "../pets-repository";
import { JsonValue } from "../../generated/prisma/runtime/library";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            birthday: data.birthday ? new Date(data.birthday): null,
            size: data.size ?? null,
            energy: data.energy ?? null,
            independence: data.independence ?? null,
            enviroment: data.enviroment ?? null,
            photos: data.photos ?? null as JsonValue[] | null,
            requirements: data.requirements ?? null as JsonValue[] | null,
            organization_id: data.organization_id,
            created_at: new Date()
        }

        this.items.push(pet)

        return pet
    }
}