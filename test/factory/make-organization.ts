import { faker } from '@faker-js/faker';

interface Organization {
	phone?:string
	password?:string
}

export function makeOrganization({
	phone,password
}:Organization){
	return{
		id: crypto.randomUUID(),
		name: faker.company.name(),
		cep: faker.location.zipCode(),
		city: faker.location.city(),
		email: faker.internet.email(),
		neighborhood: faker.location.streetAddress(),
		password: password ?? faker.internet.password(),
		phone: phone ?? faker.phone.number(),
		responsible: faker.person.fullName(),
		state: faker.location.state(),
		street: faker.location.street()
	};
}