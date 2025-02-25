import { faker } from '@faker-js/faker';
import { $Enums } from '@prisma/client';

interface Organization {
	phone?:string
	password?:string
	isAdmin?: boolean
}

export function makeOrganization(data?:Organization){
	return{
		id: crypto.randomUUID(),
		name: faker.company.name(),
		cep: faker.location.zipCode(),
		city: faker.location.city(),
		email: faker.internet.email(),
		neighborhood: faker.location.streetAddress(),
		password: data?.password ?? faker.internet.password(),
		phone: data?.phone ?? faker.phone.number(),
		responsible: faker.person.fullName(),
		state: faker.location.state(),
		street: faker.location.street(),
		role: data?.isAdmin ? 'ADMIN' : 'MEMBER' as $Enums.Role,
	};
}