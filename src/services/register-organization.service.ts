import { hash } from 'bcryptjs';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { EmailAlreadyInUseError } from './errors/email-already-in-use';

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
			throw new EmailAlreadyInUseError();
		}

		const password_hash = await hash(data.password,6);

		const organization = await this.organizationsRepository.create({
			name: data.name,
			responsible: data.responsible,
			email: data.email,
			password_hash,
			city: data.city,
			state: data.state,
			cep: data.cep,
			neighborhood: data.neighborhood,
			street: data.street,
			phone: data.phone,
		});

		return {organization};
	}
}