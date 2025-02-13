import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository';
import { RegisterOrganizationService } from '../register-organization.service';

export function makeRegisterOrganizationService(){
	const organizationsRepository = new PrismaOrganizationsRepository();
  
	const registerOrganizationService = new RegisterOrganizationService(organizationsRepository);
  
	return registerOrganizationService;
}