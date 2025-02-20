import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { ListPetsService } from '../list-pets.service';

export function makeListPetsService(){

	const petsRepository = new PrismaPetsRepository();
  
	const listPetsService = new ListPetsService(petsRepository);

	return listPetsService;
}