import request from 'supertest';
import { afterAll, beforeAll, describe, expect,it } from 'vitest';
import { app } from '@/app';

describe('Register (e2e)', ()=>{
	beforeAll(async ()=>{
		await app.ready();
	});

	afterAll(async()=>{
		await app.close();
	});
	
	it('should be able to register', async()=>{
		const response = await request(app.server)
			.post('/organizations')
			.send({
				name: 'JSPet Org',
				responsible: 'John Doe',
				email: 'johndoe@example.com',
				password: '123456',
				city: 'Itajaí',
				state: 'Santa Catarina',
				cep: '99999999',
				neighborhood: 'Fazenda',
				street: 'Onze de Junho',
				phone: '99999999999'
			});
		

		expect(response.statusCode)
			.toEqual(201);
	});
});