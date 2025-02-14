import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OrganizationNotFoundError } from '@/services/errors/organization-not-found';
import { makeRegisterPetService } from '@/services/factories/make-register-pet';

export async function register(request:FastifyRequest, response:FastifyReply){
	const createPetBodySchema = z.object({
		name: z.string(),
		birthDate: z.date(),
		organizationId: z.string()
	});

	const data = createPetBodySchema.parse(request.body);

	try{
		const registerPetService = makeRegisterPetService();

		await registerPetService.execute(data);

	}catch(err){
		if(err instanceof OrganizationNotFoundError){
			return response.status(409)
				.send({message: err.message});
		}

		throw err;
	}

	return response.status(201)
		.send();
}