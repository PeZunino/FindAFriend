import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/middlewares/verify-jwt';
import { list } from './list';
import { register } from './register';

export async function petsRoutes(app:FastifyInstance){
	app.addHook('onRequest', verifyJWT);

	app.post('/pets',register);

	app.get('/pets',list);
}