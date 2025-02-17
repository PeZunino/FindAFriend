import { describe, expect, it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { ListPetsService } from './list-pets.service';

describe('List Pets Service',async()=>{
	it('should be able to list all pets from a specify city', async()=>{
		const organizationsRepository = new InMemoryOrganizationRepository();

		const petsRepository = new InMemoryPetsRepository(organizationsRepository);
    
		const sut = new ListPetsService(petsRepository);

		const organization = await organizationsRepository.create({
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

		await petsRepository.create({
			id: 'pet-1',
			birthDate: new Date(),
			name:'Little Doe',
			organizationId:organization.id
		});

		await petsRepository.create({
			id: 'pet-2',
			birthDate: new Date(),
			name:'Little Doe II',
			organizationId:organization.id
		});


		const {petList} = await sut.execute('Itajaí');

		expect(petList)
			.toHaveLength(2);

		expect(petList)
			.toEqual([
				expect.objectContaining({id:'pet-1'}),
				expect.objectContaining({id:'pet-2'})
			]);
	});
});