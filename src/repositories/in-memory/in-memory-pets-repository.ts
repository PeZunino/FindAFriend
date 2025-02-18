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
		city,energyLevel,size,age
	}:FindAllParams): Promise<Pet[]> {
	

		const organizationByCityList = this.organizationsRepository.items.filter(item=>item.city == city);

		const petListCity = this.items.filter(pet=>organizationByCityList.some(organization=>organization.id == pet.organizationId));

		const petListSize = petListCity.filter(pet=>size ? pet.size == size : true);

		const petList = petListSize.filter(pet=>energyLevel ? pet.energy_level == energyLevel : true);

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
			created_at: data.created_at,
			id: data.id ?? randomUUID(),
			name: data.name,
			organizationId: data.organizationId,
			updated_at:data.updated_at,
			size: data.size,
			energy_level: data.energy_level
		} as Pet;
	
		this.items.push(pet);

		return pet;
	}

}