import { $Enums } from '@prisma/client';
import { PetsRepository } from '@/repositories/pets-repository';

interface ListPetsRequest{
	city:string,
	size?:$Enums.PetSize
	energyLevel?:$Enums.PetEnergyLevel
	age?: string
	adopted?:boolean
}

export class ListPetsService{
	constructor(
		private petsRepository:PetsRepository
	){}

	async execute(data:ListPetsRequest){

		const petList = await this.petsRepository.findAll(data);

		return {petList};
	}
}