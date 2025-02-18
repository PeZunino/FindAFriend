import { randomUUID } from 'node:crypto';
import { Pet,Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { getMaxMinDateToAge } from '@/utils/get-max-min-date-to-filter-pet-by-age';
import { FindAllParams, PetsRepository } from '../pets-repository';
import { InMemoryOrganizationRepository } from './in-memory-organizations-repository';

export class InMemoryPetsRepository implements PetsRepository{
	public items: Pet[] = [];
	
	constructor(private organizationsRepository:InMemoryOrganizationRepository){}
	
	async findAll({
		city,energyLevel,size,age,adopted
	}:FindAllParams): Promise<Pet[]> {
	

		const organizationByCityList = this.organizationsRepository.items.filter(item=>item.city == city);

		const petList = this.items.filter(pet=>organizationByCityList.some(organization=>organization.id == pet.organizationId))
			.filter(pet=>size ? pet.size == size : true)
			.filter(pet=>pet.adopted == (adopted ?? true))
			.filter(pet=>energyLevel ? pet.energy_level == energyLevel : true);


		if(age){
			const {
				maxDate,minDate
			} = getMaxMinDateToAge(age);

			return petList.filter(pet=>{
				const birthDate = dayjs(pet.birthDate);

				return birthDate.isAfter(minDate) && birthDate.isBefore(maxDate);
			});
		}

		return petList;
	}
	
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = {
			birthDate: data.birthDate,
			created_at: data.created_at ?? new Date(),
			id: data.id ?? randomUUID(),
			name: data.name,
			organizationId: data.organizationId,
			updated_at:data.updated_at,
			size: data.size,
			energy_level: data.energy_level,
			adopted: data.adopted ?? true

		} as Pet;
	
		this.items.push(pet);

		return pet;
	}

}