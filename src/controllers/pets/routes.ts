import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/middlewares/verify-jwt';
import { verifyUserRole } from '@/utils/verify-organization-role';
import { list } from './list';
import { register } from './register';

export async function petsRoutes(app:FastifyInstance){
	app.addHook('onRequest', verifyJWT);

	app.post('/pets', {
		onRequest: [
			verifyUserRole('ADMIN')
		] 
	},register);

	app.get('/pets',list);
}