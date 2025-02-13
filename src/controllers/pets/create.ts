import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OrganizationNotFoundError } from '../../services/erros/organization-not-found';
import { makeCreatePetService } from '../../services/factories/make-create-pet';

export async function create(request:FastifyRequest, response:FastifyReply){
	const createPetBodySchema = z.object({
		name: z.string(),
		birthDate: z.date(),
		organizationId: z.string()
	});

	const data = createPetBodySchema.parse(request.body);

	try{
		const createPetService = makeCreatePetService();

		await createPetService.execute(data);

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