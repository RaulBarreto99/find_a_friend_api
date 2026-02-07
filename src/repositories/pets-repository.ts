import { Pet, Prisma } from "../generated/prisma";

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyByCity(city: string, page: number): Promise<Pet[]>
    findManyByCaracteristics(data: Prisma.PetWhereInput, page: number): Promise<Pet[]>
    findById(pet_id: string): Promise<Pet | null>
}