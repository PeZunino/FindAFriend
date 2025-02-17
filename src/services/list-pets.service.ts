import { PetsRepository } from '@/repositories/pets-repository';

export class ListPetsService{
	constructor(
		private petsRepository:PetsRepository){}

	async execute(city:string){

		const petList = await this.petsRepository.findByCity(city);

		return {petList};
	}
}