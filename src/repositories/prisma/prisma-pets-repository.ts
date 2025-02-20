import {Pet, Prisma} from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getMaxMinDateToAge } from '@/utils/get-max-min-date-to-filter-pet-by-age';
import { FindAllParams, PetsRepository } from '../pets-repository';


export class PrismaPetsRepository implements PetsRepository{
	async findAll({
		city,adopted,age,energyLevel,size
	}: FindAllParams): Promise<Pet[]> {
		let birthDateFilter = {};

		if (age) {
			const {
				maxDate, minDate 
			} = getMaxMinDateToAge(age);

			birthDateFilter = {
				gte: minDate.toDate(), 
				lte: maxDate.toDate(), 
			};
		}

		return await prisma.pet.findMany({
			where: {
				birthDate: birthDateFilter,
				size,
				energy_level: energyLevel,
				adopted: adopted ?? true, 
				organization: {
					city: {
						contains: city,
						mode: 'insensitive', 
					},
				},
			},
		});
	}
	async findById(id: string): Promise<Pet | null> {
		const petList = await prisma.pet.findFirst({where:{id}});
		
		return petList;
	}
	async create(data:Prisma.PetUncheckedCreateInput){
		const pet = await prisma.pet.create({data});

		return pet;
	}

	async findByCity(city:string){
		const petList = await prisma.pet.findMany({where:{organization:{city}}});
		
		return petList;
	}
}