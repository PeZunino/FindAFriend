import { $Enums } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeListPetsService } from '@/services/factories/make-list-pets-service';

export async function list(request:FastifyRequest,response:FastifyReply){

	const listBodySchema = z.object({
		city:z.string(),
		energyLevel: z.nativeEnum($Enums.PetEnergyLevel)
			.optional(),
		size: z.nativeEnum($Enums.PetSize)
			.optional(),
		age:z.string()
			.optional(),
		adopted:z.boolean()
			.optional(),
	});
	
	const data = listBodySchema.parse(request.query);

	try{
		const listPetsService = makeListPetsService();

		const {petList} = await listPetsService.execute(data);

		return response.status(200)
			.send(petList);
	}catch{
		return response.status(500)
			.send({ message: 'Internal server error' });
	}

}