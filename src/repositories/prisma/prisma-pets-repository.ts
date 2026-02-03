import { Prisma, Pet } from "../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }
    async findManyByCity(city: string, page: number) {
        const pets = await prisma.pet.findMany({
            where:{
                city: city
            },
            take:20,
            skip: (page - 1) * 20,
        })

        return pets
    }
}