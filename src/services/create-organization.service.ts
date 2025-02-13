import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { EmailAlreadyInUseError } from './errors/email-already-in-use';

interface CreateOrganizationServiceRequest{
	name :string
	responsible :string
	email :string 
	password_hash :string
	city :string
	state :string
	cep :string
	neighborhood :string
	street :string
	phone :string
}

export class CreateOrganizationService{
	constructor(private organizationRepository:OrganizationsRepository){}

	async execute(data:CreateOrganizationServiceRequest){

		const emailAlreadyInUser = await this.organizationRepository.findByEmail(data.email);

		if(emailAlreadyInUser){
			throw new EmailAlreadyInUseError();
		}

		const organization = await this.organizationRepository.create(data);

		return organization;
	}
}