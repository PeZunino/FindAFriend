import { Prisma } from '@prisma/client';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { OrganizationNotFoundError } from './errors/organization-not-found';
export default class RegisterPetService{

	constructor(
		private organizationsRepository: OrganizationsRepository,
		private petsRepository:PetsRepository
	){}

	async execute(data:Prisma.PetUncheckedCreateInput){
		const organization = await this.organizationsRepository.findById(data.organizationId);

		if(!organization){
			throw new OrganizationNotFoundError();
		}
		
		const pet = await this.petsRepository.create(data);
		
		return {pet};
	}
}