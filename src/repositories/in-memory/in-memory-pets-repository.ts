import { randomUUID } from 'node:crypto';
import { Pet,Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { getMaxMinDateToAge } from '@/utils/get-max-min-date-to-filter-pet-by-age';
import { FindAllParams, PetsRepository } from '../pets-repository';
import { InMemoryOrganizationRepository } from './in-memory-organizations-repository';

export class InMemoryPetsRepository implements PetsRepository{
	public items: Pet[] = [];
	
	constructor(private organizationsRepository:InMemoryOrganizationRepository){}
	
	async findById(id: string): Promise<Pet | null> {
		const pet = this.items.find(item=>item.id == id);
	
		return pet ?? null;
	}
	
	async findAll({
		city,energyLevel,size,age,adopted
	}:FindAllParams): Promise<Pet[]> {
	

		const organizationByCityList = this.organizationsRepository.items.filter(item=>item.city == city);

		const petListCity = this.items.filter(pet=>organizationByCityList.some(organization=>organization.id == pet.organizationId))

			.filter(pet=>size ? pet.size == size : true)

			.filter(pet=>pet.adopted == (adopted ?? true))

			.filter(pet=>energyLevel ? pet.energyLevel == energyLevel : true);

		if(age){
			const {
				maxDate,minDate
			} = getMaxMinDateToAge(age);

			return petListCity.filter(pet=>{
				const birthDate = dayjs(pet.birthDate);

				return birthDate.isAfter(minDate) && birthDate.isBefore(maxDate);
			});
		}

		return petListCity;
	}
	
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = {
			birthDate: data.birthDate,
			createdAt: data.createdAt ?? new Date(),
			id: data.id ?? randomUUID(),
			name: data.name,
			organizationId: data.organizationId,
			updatedAt:data.updatedAt,
			size: data.size,
			energyLevel: data.energyLevel,
			adopted: data.adopted ?? true

		} as Pet;
	
		this.items.push(pet);

		return pet;
	}

}