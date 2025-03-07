import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { organizationsRoutes } from './controllers/organizations/routes';
import { petsRoutes } from './controllers/pets/routes';
import { env } from './env';

export const app = fastify();

app.register(fastifyJwt,{
	secret: env.JWT_SECRET,
	cookie: {



		cookieName: 'refreshToken',


		signed: false,


	},


	sign: {expiresIn: '10m',},
});

app.register(fastifyCookie);

app.register(organizationsRoutes);

app.register(petsRoutes);

app.setErrorHandler((err, _, response)=>{
	if(err instanceof ZodError){
		return response.status(400)
			.send({
				message: 'Validation error',
				issues: err.format()
			});
	}
  
	console.error(err);
	

	return response.status(500)
		.send({message: 'Internal server error'});
});