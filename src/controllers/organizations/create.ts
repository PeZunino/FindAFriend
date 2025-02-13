import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { EmailAlreadyInUseError } from '../../services/erros/email-already-in-use';
import { makeCreateOrganizationService } from '../../services/factories/make-create-organization-service';

export async function create(request:FastifyRequest, response:FastifyReply){
	const createOrganizationBodySchema = z.object({
		name :z.string(),
		responsible :z.string(),
		email :z.string()
			.email(), 
		password_hash :z.string()
			.min(6),
		city :z.string(),
		state :z.string(),
		cep :z.string(),
		neighborhood :z.string(),
		street :z.string(),
		phone :z.string()
	});

	const data = createOrganizationBodySchema.parse(request.body);

	try{

		const createOrganizationService = makeCreateOrganizationService();
		
		createOrganizationService.execute(data);
	}catch(err){
		if(err instanceof EmailAlreadyInUseError){
			return response.status(409)
				.send({message: err.message});
		}

		throw err;
	}

	return response.status(201)
		.send();
}