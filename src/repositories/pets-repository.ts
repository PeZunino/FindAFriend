import { Pet, Prisma } from '@prisma/client';

export interface FindAllParams{
	city:string
	size?:string
	energyLevel?:string
	age?:number
	adopted?:boolean
}

export interface PetsRepository{
	create(data:Prisma.PetUncheckedCreateInput):Promise<Pet>

	findAll(data: FindAllParams): Promise<Pet[]>
	
	findById(id:string): Promise<Pet | null>

}