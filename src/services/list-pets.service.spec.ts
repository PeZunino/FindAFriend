import { $Enums, Organization } from '@prisma/client';
import dayjs from 'dayjs';
import { makeOrganization } from 'test/factory/make-organization';
import { makePet } from 'test/factory/make-pet';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { ListPetsService } from './list-pets.service';

let organizationsRepository: InMemoryOrganizationRepository;

let petsRepository: InMemoryPetsRepository;

let sut: ListPetsService;

let organization: Organization;

describe('List Pets Service',async()=>{

	beforeEach(async()=>{
		organizationsRepository = new InMemoryOrganizationRepository();

		petsRepository = new InMemoryPetsRepository(organizationsRepository);
    
		sut = new ListPetsService(petsRepository);

		organization = await organizationsRepository.create(makeOrganization());
	});

	it('should be able to list pets by age', async()=>{
		const organization = await organizationsRepository.create({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho',
		});

		await petsRepository.create({
			id: 'pet-1',
			birthDate: dayjs()
				.subtract(1, 'year')
				.toDate(),
			name:'Little Doe',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM,
		});

		await petsRepository.create({
			id: 'pet-2',
			birthDate: dayjs()
				.subtract(2, 'year')
				.toDate(),
			name:'Little Doe II',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.MEDIUM,
			size: $Enums.PetSize.SMALL
		});


		const {petList} = await sut.execute({
			city: 'Itajaí',
			age: '2'
		});


		expect(petList)
			.toHaveLength(1);

		expect(petList)
			.toEqual([
				expect.objectContaining({id:'pet-2'}),
			]);


	});

	it('should be able to list all pets from a specify city', async()=>{

		const pet = makePet({organizationId:organization.id});

		await petsRepository.create(pet);

		const {petList} = await sut.execute({city: organization.city});

		expect(petList)
			.toHaveLength(1);

		expect(petList)
			.toEqual([
				expect.objectContaining({id:pet.id}),
			]);
	});

	it('should be able to list pets by adoption status', async()=>{
		const organization = await organizationsRepository.create({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho',
		});

		await petsRepository.create({
			id: 'pet-1',
			birthDate: dayjs()
				.subtract(1, 'year')
				.toDate(),
			name:'Little Doe',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM,
			adopted:false
		});

		await petsRepository.create({
			id: 'pet-2',
			birthDate: dayjs()
				.subtract(2, 'year')
				.toDate(),
			name:'Little Doe II',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.MEDIUM,
			size: $Enums.PetSize.SMALL
		});


		const petsBySize = await sut.execute({
			city: 'Itajaí',
			adopted:false
		});


		expect(petsBySize.petList)
			.toHaveLength(1);

		expect(petsBySize.petList)
			.toEqual([
				expect.objectContaining({id:'pet-1'}),
			]);


	});

	it('should be able to list pets by size ', async()=>{
		
		const organization = await organizationsRepository.create({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho',
		});

		await petsRepository.create({
			id: 'pet-1',
			birthDate: new Date(),
			name:'Little Doe',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.HIGH,
			size: $Enums.PetSize.MEDIUM
		});

		await petsRepository.create({
			id: 'pet-2',
			birthDate: new Date(),
			name:'Little Doe II',
			organizationId:organization.id,
			energyLevel: $Enums.PetEnergyLevel.MEDIUM,
			size: $Enums.PetSize.SMALL
		});


		const petsBySize = await sut.execute({
			city: 'Itajaí',
			size: $Enums.PetSize.SMALL
		});

		expect(petsBySize.petList)
			.toHaveLength(1);

		expect(petsBySize.petList)
			.toEqual([
				expect.objectContaining({id:'pet-2'}),
			]);
	});

	it('should be able to list pets by energy level ', async()=>{
		const pet = makePet({organizationId:organization.id});

		await petsRepository.create(pet);

		const petsByEnergyLevel = await sut.execute({
			city: organization.city,
			energyLevel: pet.energyLevel,
		});

		expect(petsByEnergyLevel.petList)
			.toHaveLength(1);

		expect(petsByEnergyLevel.petList)
			.toEqual([
				expect.objectContaining({id:pet.id}),
			]);
	});
});