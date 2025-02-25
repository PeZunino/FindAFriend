import request from 'supertest';
import { makeOrganization } from 'test/factory/make-organization';
import { makePet } from 'test/factory/make-pet';
import { afterAll, beforeAll, describe, expect,it } from 'vitest';
import { app } from '@/app';
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization';

describe('Register Pet (e2e)', ()=>{
	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});
	
	it('should be able to register', async()=>{
		const { token } = await createAndAuthenticateOrganization(app);

		const createOrganizationResponse = await request(app.server)
			.post('/organizations')
			.set('Authorization', `Bearer ${token}`)
			.send(makeOrganization());
		
		const {organization} = createOrganizationResponse.body;

		const pet = makePet({organizationId:organization.id});

		const response = await request(app.server)
			.post('/pets')
			.send(pet);

		expect(response.statusCode)
			.toEqual(201);
	});
});