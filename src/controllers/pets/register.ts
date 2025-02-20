import { $Enums } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OrganizationNotFoundError } from '@/services/errors/organization-not-found';
import { makeRegisterPetService } from '@/services/factories/make-register-pet';

export async function register(request:FastifyRequest, response:FastifyReply){
	
	const createPetBodySchema = z.object({
		name: z.string(),
		birthDate: z.string(),
		organizationId: z.string(),
		energyLevel: z.nativeEnum($Enums.PetEnergyLevel),
		size: z.nativeEnum($Enums.PetSize),
		adopted: z.boolean()
			.optional()
			.default(true),
	});

	const data = createPetBodySchema.parse(request.body);
		
	try{
		const registerPetService = makeRegisterPetService();

		await registerPetService.execute(data);

	}catch(err){
		if(err instanceof OrganizationNotFoundError){
			return response.status(409)
				.send({message: err.message});
		}

		throw err;
	}

	return response.status(201)
		.send();
}