import request from 'supertest';
import { makeOrganization } from 'test/factory/make-organization';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';

describe('Refresh Token (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to refresh a token', async () => {
		const organization = makeOrganization();

		await request(app.server)
			.post('/organizations')
			.send(organization);

		const authResponse = await request(app.server)
			.post('/sessions')
			.send({
				email: organization.email,
				password: organization.password,
			});

		const cookies = authResponse.get('Set-Cookie');

		if (cookies && cookies.length > 0) {
			const cookieString = cookies.join('; ');
    
			const response = await request(app.server)
				.patch('/token/refresh')
				.set('Cookie', cookieString)
				.send();
    
			expect(response.status)
				.toEqual(200);

			expect(response.body)
				.toEqual({ token: expect.any(String) });

			expect(cookies)
				.toEqual(
					expect.arrayContaining([
						expect.stringContaining('refreshToken=')
					]),
				);
		} else {
			throw new Error('No cookies received, unable to test token refresh');
		}

	});
});