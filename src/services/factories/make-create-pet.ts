import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organization-repository';
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository';
import CreatePetService from '../create-pet.service';

export function makeCreatePetService(){
	const prismaPetsRepository = new PrismaPetsRepository();
  
	const prismaOrganizationRepository = new PrismaOrganizationsRepository();
  
	const createPetService = new CreatePetService(prismaOrganizationRepository,prismaPetsRepository);
  
	return createPetService;
}