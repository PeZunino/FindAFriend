import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { makeOrganization } from 'test/factory/make-organization';
import { prisma } from '@/lib/prisma';
export async function createAndAuthenticateOrganization(
	app:FastifyInstance,
	isAdmin = false,
){
	const organization = makeOrganization({isAdmin});

	await prisma.organization.create({data: organization});

	const authResponse = await request(app.server)
		.post('/sessions')
		.send({
			email: organization.email,
			password: organization.password
		});

	const {token} = authResponse.body;

	return {token};
}