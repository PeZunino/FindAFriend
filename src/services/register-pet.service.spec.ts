import { $Enums } from '@prisma/client';
import { beforeEach,describe, expect,it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { OrganizationNotFoundError } from './errors/organization-not-found';
import { RegisterOrganizationService } from './register-organization.service';
import RegisterPetService from './register-pet.service';

let petsRepository:PetsRepository;

let organizationsRepository:InMemoryOrganizationRepository;

let sut: RegisterPetService;

describe('Register Pet Service',()=>{

	beforeEach(()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
		
		petsRepository = new InMemoryPetsRepository(organizationsRepository);

		sut = new RegisterPetService(organizationsRepository,petsRepository);
		
	});
	
	it('should not be able to register a pet in a non registered organization', async()=>{

		await expect(sut.execute({
			birthDate: new Date(),
			name:'Little Doe',
			organizationId:'123',
			energyLevel: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM
		}))
			.rejects.toBeInstanceOf(OrganizationNotFoundError);
	});

	it('should be able to register a pet', async()=>{

		const registerOrganizationService = new RegisterOrganizationService(organizationsRepository);

		const {organization} = await registerOrganizationService.execute({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho'
		});

		const {pet} = await sut.execute({
			birthDate: new Date(),
			name:'Little Doe',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM
		});

		expect(pet.id)
			.toEqual(expect.any(String));
	});

});