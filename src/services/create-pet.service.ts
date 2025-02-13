import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { OrganizationNotFoundError } from './errors/organization-not-found';


interface CreatePetServiceRequest{
	name: string
	birthDate: Date
	organizationId: string
}

export default class CreatePetService{

	constructor(
		private organizationRepository: OrganizationsRepository,
		private petsRepository:PetsRepository
	){}

	async execute(data:CreatePetServiceRequest){
		const organization = await this.organizationRepository.findById(data.organizationId);

		if(!organization){
			throw new OrganizationNotFoundError();
		}

		await this.petsRepository.create(data);
	}
}