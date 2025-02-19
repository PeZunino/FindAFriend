import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service';

export async function authenticate(request:FastifyRequest, response: FastifyReply){
	const authenticateBodySchema = z.object({
		email: z.string()
			.email(),
		password: z.string()
			.min(6)
	});

	const {
		email,password
	} = authenticateBodySchema.parse(request.body);

	try{

		const authenticateService = makeAuthenticateService();
    
		const {organization} = await authenticateService.execute({
			email,
			password
		});
    
		response.status(200)
			.send({organization});
	}catch(err){
		if(err instanceof InvalidCredentialsError){
			return response.status(400)
				.send({message: err.message});
		}

		throw err;
	}

} 