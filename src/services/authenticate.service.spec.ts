import { Organization } from '@prisma/client';
import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateService } from './authenticate.service';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let organizationsRepository: InMemoryOrganizationRepository;

let organization:Organization;

let sut:AuthenticateService;

describe('Authenticate Service', async()=>{

	beforeEach(async()=>{
		organizationsRepository = new InMemoryOrganizationRepository();

		organization = await organizationsRepository.create({
			name: 'JSPet Org',
			cep: '99999999',
			city: 'Itajaí',
			email: 'johndoe@example.com',
			neighborhood: 'Fazenda',
			password_hash: await hash('123456',6),
			phone: '99999999999',
			responsible: 'John Doe',
			state: 'Santa Catarina',
			street: 'Onze de Junho',
		});
   
		sut = new AuthenticateService(organizationsRepository);
	});

	it('should be able to authenticate an organization', async()=>{
		
		const authenticated = await sut.execute({
			email: organization.email,
			password: '123456'
		});

		expect(authenticated.organization.id)
			.toEqual(expect.any(String));

	});

	it('should not be able to to authenticate with wrong email', async()=>{

		expect(()=>
			sut.execute({
				email: organization.email,
				password: '000000'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);

	});

	it('should not be able to to authenticate with wrong password', async()=>{

		expect(()=>
			sut.execute({
				email: 'wrongemail@gmail.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);

	});
});