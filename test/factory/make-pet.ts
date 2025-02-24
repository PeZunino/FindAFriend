import { faker } from '@faker-js/faker';
import { $Enums } from '@prisma/client';

interface Pet{
	organizationId:string,
	birthDate?:Date
	id?:string
}

export function makePet(data?:Pet){

	return {
		id: data?.id ?? crypto.randomUUID(),
		birthDate: data?.birthDate ?? faker.date.past(),
		name:faker.animal.dog(),
		organizationId: data?.organizationId ?? crypto.randomUUID(),
		energyLevel:  faker.helpers.arrayElement(Object.values($Enums.PetEnergyLevel)),
		size: faker.helpers.arrayElement(Object.values($Enums.PetSize)),
	};
}