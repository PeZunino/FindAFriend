import { Pet,Prisma } from '@prisma/client';
import { PetsRepository } from '../pets-repository';

export class InMemoryPetsRepository implements PetsRepository{
	public items: Pet[] = [];
  
	async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		const pet = {
			birthDate: data.birthDate,
			created_at: data.created_at,
			id: 'pet-1',
			name: data.name,
			organizationId: data.organizationId,
			updated_at:data.updated_at
		} as Pet;
    
		this.items.push(pet);

		return pet;
	}

}