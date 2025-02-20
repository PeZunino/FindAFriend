import { faker } from '@faker-js/faker';
import { $Enums } from '@prisma/client';

interface Pet{
	organizationId:string,
	birthDate?:Date
}

export function makePet({
	birthDate,organizationId
}:Pet){

	return {
		birthDate: birthDate ?? faker.date.past(),
		name:faker.animal.dog(),
		organizationId,
		energyLevel:  faker.helpers.arrayElement(Object.values($Enums.PetEnergyLevel)),
		size: faker.helpers.arrayElement(Object.values($Enums.PetSize)),
	};
}