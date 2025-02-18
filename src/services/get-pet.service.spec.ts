import { $Enums, Organization } from '@prisma/client';
import { beforeEach, describe,expect,it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { PetNotFoundError } from './errors/pet-not-found';
import { GetPetService } from './get-pet.service';

let organizationsRepository : InMemoryOrganizationRepository;
   
let petsRepository : InMemoryPetsRepository;

let sut : GetPetService;

let organization: Organization;

describe('Get Pet Service', async()=>{
	
	beforeEach(async()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
    
		petsRepository = new InMemoryPetsRepository(organizationsRepository);
    
		sut = new GetPetService(petsRepository);

		organization = await organizationsRepository.create({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password_hash: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho',
		});
	});
  
	it('should be able to get pet details by id ', async()=>{

		await petsRepository.create({
			id: 'pet-1',
			birthDate: new Date(),
			name:'Little Doe',
			organizationId:organization.id,
			energy_level: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM
		});

		const {pet} = await sut.execute('pet-1');

		expect(pet)
			.toEqual(
				expect.objectContaining({id:'pet-1'})
			);
	});

	it('should not be able to retrieve an unregistered Pet', async()=>{
		await expect(()=>sut.execute('pet-1')).rejects.toBeInstanceOf(PetNotFoundError);
	});
});