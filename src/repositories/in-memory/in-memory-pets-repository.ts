import { randomUUID } from 'node:crypto';
import { Pet,Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository';
import { InMemoryOrganizationRepository } from './in-memory-organizations-repository';

export class InMemoryPetsRepository implements PetsRepository{
	public items: Pet[] = [];
	
	constructor(private organizationsRepository:InMemoryOrganizationRepository){}
	
	async findByCity(city: string): Promise<Pet[]> {
		const organizationByCityList = this.organizationsRepository.items.filter(item=>item.city == city);

		const petList = this.items.filter(
			pet=>organizationByCityList.some(organization=>organization.id == pet.organizationId));
	
		return petList;
	}
	
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = {
			birthDate: data.birthDate,
			created_at: data.created_at,
			id: data.id ?? randomUUID(),
			name: data.name,
			organizationId: data.organizationId,
			updated_at:data.updated_at
		} as Pet;
	
		this.items.push(pet);

		return pet;
	}

	async filterByOrganizationId(organizationId: string): Promise<Pet[]> {
		const organization = this.items.filter(item=>item.organizationId == organizationId);

		return organization;
	}
  

}