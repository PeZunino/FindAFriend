import { Organization,Prisma } from '@prisma/client';
import { OrganizationsRepository } from '../organizations-repository';

export class InMemoryOrganizationRepository implements OrganizationsRepository{
	public items: Organization[] = [];
  
	async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
		const organization = {
			id:'org-1',
			name: data.name,
			cep: data.cep,
			city: data.city,
			email: data.email,
			neighborhood: data.neighborhood,
			password_hash: data.password_hash,
			phone: data.phone,
			responsible: data.responsible,
			state: data.state,
			street: data.street
		} as Organization;
    
		this.items.push(organization);

		return organization;
	}
	async findByEmail(email: string): Promise<Organization | null> {
		const organization = this.items.find(item=>item.email == email);
    
		return organization ?? null;
	}
	async findById(id: string): Promise<Organization | null> {
		const organization = this.items.find(item=>item.id == id);
    
		return organization ?? null;
	}
	async findByCity(city: string): Promise<Organization[]> {
		const organization = this.items.filter(item=>item.city == city);
    
		return organization;
	}
}