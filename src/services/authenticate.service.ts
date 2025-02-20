import { compare } from 'bcryptjs';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateServiceRequest{
	email:string,
	password:string
}

export class AuthenticateService{
	constructor(private organizationsRepository:OrganizationsRepository){}

	async execute({
		email,password
	}:AuthenticateServiceRequest){

		const organization = await this.organizationsRepository.findByEmail(email);

		if(!organization){
			throw new InvalidCredentialsError();
		}

		const passwordMatches = await compare(password, organization.password);
	
		if(!passwordMatches){
			throw new InvalidCredentialsError();
		}

		return{organization};
	}
}