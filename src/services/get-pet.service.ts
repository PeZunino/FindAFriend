import { PetsRepository } from '@/repositories/pets-repository';
import { PetNotFoundError } from './errors/pet-not-found';

export class GetPetService{
	constructor(private petsRepository:PetsRepository){}

	async execute(id:string){
		const pet = await this.petsRepository.findById(id);
	
		if(!pet){
			throw new PetNotFoundError();
		}

		return {pet};
	}
}