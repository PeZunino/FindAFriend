import { beforeEach,describe, expect,it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { RegisterOrganizationService } from './register-organization.service';
import RegisterPetService from './register-pet.service';

let petsRepository:PetsRepository;

let organizationsRepository:OrganizationsRepository;

let sut: RegisterPetService;

describe('Register Pet Service',()=>{

	beforeEach(()=>{
		petsRepository = new InMemoryPetsRepository();

		organizationsRepository = new InMemoryOrganizationRepository();

		sut = new RegisterPetService(organizationsRepository,petsRepository);
		
	});
	
	it('it should be able to register a pet', async()=>{

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
			organizationId:organization.id
		});

		expect(pet.id)
			.toEqual(expect.any(String));
	});

});