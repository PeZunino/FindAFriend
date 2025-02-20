import { Organization,Prisma } from '@prisma/client';
import { OrganizationsRepository } from '../organizations-repository';

export class InMemoryOrganizationRepository implements OrganizationsRepository{

	public items: Organization[] = [];
  
	async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
		const organization = {
			id:data.id ?? crypto.randomUUID(),
			...data
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
	async findByPhone(phone: string): Promise<Organization | null> {
		const organization = this.items.find(item=>item.phone == phone);
    
		return organization ?? null;
	}
}