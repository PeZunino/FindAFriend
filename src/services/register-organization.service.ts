import { hash } from 'bcryptjs';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { EmailAlreadyInUseError } from './errors/email-already-in-use';
import { PhoneAlreadyInUseError } from './errors/phone-already-in-use copy';

interface RegisterOrganizationServiceRequest{
	name :string
	responsible :string
	email :string 
	password :string
	city :string
	state :string
	cep :string
	neighborhood :string
	street :string
	phone :string
}

export class RegisterOrganizationService{
	constructor(private organizationsRepository:OrganizationsRepository){}

	async execute(data:RegisterOrganizationServiceRequest){

		const emailAlreadyInUser = await this.organizationsRepository.findByEmail(data.email);

		if(emailAlreadyInUser){
			throw new EmailAlreadyInUseError();
		}

		const phoneAlreadyInUser = await this.organizationsRepository.findByPhone(data.phone);

		if(phoneAlreadyInUser){
			throw new PhoneAlreadyInUseError();
		}

		const passwordHash = await hash(data.password,6);

		const organization = await this.organizationsRepository.create({
			...data,
			password: passwordHash
		});

		return {organization};
	}
}