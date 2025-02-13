import { compare } from 'bcryptjs';
import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { EmailAlreadyInUseError } from './errors/email-already-in-use';
import { RegisterOrganizationService } from './register-organization.service';

let organizationsRepository: OrganizationsRepository;

let sut: RegisterOrganizationService;

describe('Create organization Service',()=>{
	beforeEach(()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
		
		sut = new RegisterOrganizationService(organizationsRepository);
	});
	
	it('should not be able to register with a email already in use', async()=>{
		const email = 'johndoe@example.com';

		await sut.execute({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email,
			neighborhood: 'Fazenda',
			password: '123456',
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho'
		});

		await expect(()=>
			sut.execute({
				name: 'JSPet Org',
				cep: '99999999',
				city: 'Itajaí',
				email,
				neighborhood: 'Fazenda',
				password: '123456',
				phone: '99999999999',
				responsible: 'John Doe',
				state: 'Santa Catarina',
				street: 'Onze de Junho'
			})
		).rejects.toBeInstanceOf(EmailAlreadyInUseError);
	});

	it('should hash organization password', async()=>{
		const password = '123456';

		const {organization} = await sut.execute({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password,
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho'
		});

		const isPasswordHashed = await compare(password, organization.password_hash);

		expect(isPasswordHashed)
			.toBe(true);
	});

	it('should be able to register an organization', async ()=>{

		const {organization} = await sut.execute({
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

		expect(organization.id)
			.toEqual(expect.any(String));
	});

});