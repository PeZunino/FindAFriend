import { Organization } from '@prisma/client';
import request from 'supertest';
import { makeOrganization } from 'test/factory/make-organization';
import { makePet } from 'test/factory/make-pet';
import { afterAll, beforeAll, beforeEach, describe, expect,it } from 'vitest';
import { app } from '@/app';
import { getMaxMinDateToAge } from '@/utils/get-max-min-date-to-filter-pet-by-age';

let organization: Organization;

describe('Register Pet (e2e)', ()=>{
	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});
	
	beforeEach(async()=>{
		const createOrganizationResponse = await request(app.server)
			.post('/organizations')
			.send(makeOrganization());
  
		organization = createOrganizationResponse.body.organization ;
	});

	it('should be able to get pets by city', async()=>{
		 
		await request(app.server)
			.post('/pets')
			.send(makePet({organizationId:organization.id}));

		const response = await request(app.server)
			.get('/pets')
			.query({city: organization.city});

		expect(response.statusCode)
			.toEqual(200);

		expect(response.body)
			.toHaveLength(1);
	});

	it('should be able to get pets by city and age', async()=>{
		const {maxDate} = getMaxMinDateToAge('3');

		const birthDate = maxDate.toDate();

		await request(app.server)
			.post('/pets')
			.send(makePet({
				organizationId:organization.id,
				birthDate
			}));

		await request(app.server)
			.post('/pets')
			.send(makePet({organizationId:organization.id}));

		const response = await request(app.server)
			.get('/pets')
			.query({
				city: organization.city,
				age: 3 
			});

		expect(response.statusCode)
			.toEqual(200);

		expect(response.body)
			.toHaveLength(1);
	});
});