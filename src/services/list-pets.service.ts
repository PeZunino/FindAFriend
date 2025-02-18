import { PetsRepository } from '@/repositories/pets-repository';

interface ListPetsRequest{
	city:string,
	size?:string,
	energyLevel?:string
	age?: number
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