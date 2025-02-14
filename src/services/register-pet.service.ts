import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { PetsRepository } from '@/repositories/pets-repository';
import { OrganizationNotFoundError } from './errors/organization-not-found';


interface RegisterPetServiceRequest{
	name: string
	birthDate: Date
	organizationId: string
}

export default class RegisterPetService{

	constructor(
		private organizationRepository: OrganizationsRepository,
		private petsRepository:PetsRepository
	){}

	async execute(data:RegisterPetServiceRequest){
		const organization = await this.organizationRepository.findById(data.organizationId);

		if(!organization){
			throw new OrganizationNotFoundError();
		}

		await this.petsRepository.create(data);
	}
}