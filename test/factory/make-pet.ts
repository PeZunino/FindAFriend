import { faker } from '@faker-js/faker';
import { $Enums } from '@prisma/client';

export function makePet(organizationId:string){

	return {
		birthDate: faker.date.past(),
		name:faker.animal.dog(),
		organizationId,
		energyLevel:  faker.helpers.arrayElement(Object.values($Enums.PetEnergyLevel)),
		size: faker.helpers.arrayElement(Object.values($Enums.PetSize)),
	};
}