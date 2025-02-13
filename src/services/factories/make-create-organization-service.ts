import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organization-repository';
import { CreateOrganizationService } from '../create-organization.service';

export function makeCreateOrganizationService(){
	const organizationsRepository = new PrismaOrganizationsRepository();
  
	const createOrganizationService = new CreateOrganizationService(organizationsRepository);
  
	return createOrganizationService;
}