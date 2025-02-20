import { hash } from 'bcryptjs';
import { makeOrganization } from 'test/factory/make-organization';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { AuthenticateService } from './authenticate.service';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let organizationsRepository: InMemoryOrganizationRepository;

let sut:AuthenticateService;

describe('Authenticate Service', async()=>{

	beforeEach(async()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
		
		sut = new AuthenticateService(organizationsRepository);
	});

	it('should be able to authenticate an organization', async()=>{
		const organization = makeOrganization({});

		await organizationsRepository.create({
			...organization,
			password: await hash(organization.password,6)
		});

		const authenticated = await sut.execute({
			email: organization.email,
			password: organization.password
		});

		expect(authenticated.organization.id)
			.toEqual(expect.any(String));

	});

	it('should not be able to to authenticate with wrong email', async()=>{
		const organization = makeOrganization({});

		await expect(()=>
			sut.execute({
				email: organization.email,
				password: '000000'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);

	});

	it('should not be able to to authenticate with wrong password', async()=>{

		await expect(()=>
			sut.execute({
				email: 'wrongemail@gmail.com',
				password: '123456'
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);

	});
});