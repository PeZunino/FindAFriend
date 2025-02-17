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
		private organizationsRepository: OrganizationsRepository,
		private petsRepository:PetsRepository
	){}

	async execute(data:RegisterPetServiceRequest){
		const organization = await this.organizationsRepository.findById(data.organizationId);

		if(!organization){
			throw new OrganizationNotFoundError();
		}

		
		const pet = await this.petsRepository.create(data);
		
		console.log('Here',pet);

		return {pet};
	}
}