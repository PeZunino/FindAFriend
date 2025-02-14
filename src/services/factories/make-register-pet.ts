import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import RegisterPetService from '../register-pet.service';


export function makeRegisterPetService(){
	const prismaPetsRepository = new PrismaPetsRepository();
  
	const prismaOrganizationRepository = new PrismaOrganizationsRepository();
  
	const registerPetService = new RegisterPetService(prismaOrganizationRepository,prismaPetsRepository);
  
	return registerPetService;
}