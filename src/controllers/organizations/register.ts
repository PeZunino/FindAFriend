import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeRegisterOrganizationService } from '@/services/factories/make-register-organization-service';
import { EmailAlreadyInUseError } from '../../services/errors/email-already-in-use';

export async function register(request:FastifyRequest, response:FastifyReply){
	const createOrganizationBodySchema = z.object({
		name :z.string(),
		responsible :z.string(),
		email :z.string()
			.email(), 
		password :z.string()
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

		const createOrganizationService = makeRegisterOrganizationService();
		
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