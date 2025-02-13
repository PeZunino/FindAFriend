import fastify from 'fastify';
import { organizationsRoutes } from './controllers/organizations/routes';
import { petsRoutes } from './controllers/pets/routes';

export const app = fastify();

app.register(organizationsRoutes,{prefix:'/organizations'});

app.register(petsRoutes,{prefix:'/pets'});