import { compare } from 'bcryptjs';
import { makeOrganization } from 'test/factory/make-organization';
import {beforeEach,describe,expect, it} from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { EmailAlreadyInUseError } from './errors/email-already-in-use';
import { PhoneAlreadyInUseError } from './errors/phone-already-in-use copy';
import { RegisterOrganizationService } from './register-organization.service';

let organizationsRepository: OrganizationsRepository;

let sut: RegisterOrganizationService;

describe('Create organization Service',()=>{
	beforeEach(()=>{
		organizationsRepository = new InMemoryOrganizationRepository();
		
		sut = new RegisterOrganizationService(organizationsRepository);
	});
	
	it('should not be able to register with a email already in use', async()=>{
		const organization = makeOrganization({});

		await organizationsRepository.create(organization);

		await expect(()=>
			sut.execute(organization)
		).rejects.toBeInstanceOf(EmailAlreadyInUseError);
	});

	it('should not be able to register with a phone already in use', async()=>{
		const phone = '1234999999999';

		const organization = makeOrganization({phone});

		await organizationsRepository.create(organization);

		await expect(()=>
			sut.execute(makeOrganization({phone}))
		).rejects.toBeInstanceOf(PhoneAlreadyInUseError);
	});

	it('should hash organization password', async()=>{
		const password = '123456';

		const rawOrg = makeOrganization({password});

		const {organization} = await sut.execute(rawOrg);

		const isPasswordHashed = await compare(password, organization.password);

		expect(isPasswordHashed)
			.toBe(true);
	});

	it('should be able to register an organization', async ()=>{

		const {organization} = await sut.execute( makeOrganization({}));

		expect(organization.id)
			.toEqual(expect.any(String));
	});

});