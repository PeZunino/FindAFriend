import { faker } from '@faker-js/faker';

export function makeOrganization(){
	return{
		name: faker.company.name(),
		cep: faker.location.zipCode(),
		city: faker.location.city(),
		email: faker.internet.email(),
		neighborhood: faker.location.streetAddress(),
		password: faker.internet.password(),
		phone: faker.phone.number(),
		responsible: faker.person.fullName(),
		state: faker.location.state(),
		street: faker.location.street()
	};
}