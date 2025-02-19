import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository';
import { AuthenticateService } from '../authenticate.service';

export function makeAuthenticateService(){

	const organizationsRepository = new PrismaOrganizationsRepository();

	const authenticateService = new AuthenticateService(organizationsRepository);

	return authenticateService;
}