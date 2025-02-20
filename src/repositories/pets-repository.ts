import { $Enums, Pet, Prisma } from '@prisma/client';

export interface FindAllParams{
	city:string
	size?:$Enums.PetSize
	energyLevel?:$Enums.PetEnergyLevel
	age?:number
	adopted?:boolean
}

export interface PetsRepository{
	create(data:Prisma.PetUncheckedCreateInput):Promise<Pet>

	findAll(data: FindAllParams): Promise<Pet[]>
	
	findById(id:string): Promise<Pet | null>

}