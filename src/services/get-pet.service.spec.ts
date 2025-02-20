import { makeOrganization } from 'test/factory/make-organization';
import { makePet } from 'test/factory/make-pet';
import { beforeEach, describe,expect,it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { PetNotFoundError } from './errors/pet-not-found';
import { GetPetService } from './get-pet.service';

let organizationsRepository : InMemoryOrganizationRepository;
   
let petsRepository : InMemoryPetsRepository;

let sut : GetPetService;

describe('Get Pet Service', async()=>{
	
	beforeEach(async()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
    
		petsRepository = new InMemoryPetsRepository(organizationsRepository);
    
		sut = new GetPetService(petsRepository);

	});
  
	it('should be able to get pet details by id ', async()=>{
		const organization = makeOrganization({});

		const pet = makePet({
			id:'pet-1',
			organizationId:organization.id
		});

		await petsRepository.create(pet);

		const response = await sut.execute('pet-1');

		expect(response.pet)
			.toEqual(
				expect.objectContaining({id:'pet-1'})
			);
	});

	it('should not be able to retrieve an unregistered Pet', async()=>{
		await expect(()=>sut.execute('pet-1')).rejects.toBeInstanceOf(PetNotFoundError);
	});
});