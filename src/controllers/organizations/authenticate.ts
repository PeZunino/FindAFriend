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
    
		const token = await response.jwtSign({},{sign:{sub: organization.id}});

		const refreshToken = await response.jwtSign(
			{},{
				sign: {
					sub: organization.id,
					expiresIn: '7d',
				},
			},

		);

		return response
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({token,});

	}catch(err){
		if(err instanceof InvalidCredentialsError){
			return response.status(400)
				.send({message: err.message});
		}

		throw err;
	}

} 