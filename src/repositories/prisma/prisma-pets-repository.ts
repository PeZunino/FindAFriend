import {Prisma} from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { PetsRepository } from '../pets-repository';


export class PrismaPetsRepository implements PetsRepository{
	async create(data:Prisma.PetUncheckedCreateInput){
		const pet = await prisma.pet.create({data});

		return pet;
	}

	async findByCity(city:string){
		const petList = await prisma.pet.findMany({where:{organization:{city}}});
		
		return petList;
	}
}