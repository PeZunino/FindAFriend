import { FastifyInstance } from 'fastify';
import { list } from './list';
import { register } from './register';

export async function petsRoutes(app:FastifyInstance){
	app.post('/pets',register);

	app.get('/pets',list);
}