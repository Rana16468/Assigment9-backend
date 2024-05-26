import { Status } from '@prisma/client';
import {z} from 'zod';

//Node : Adoption Request Table All Validtion Mehtod At a Comman Spaces.
const createAdoptionRequestValidation=z.object({

    body:z.object({
        petId:z.string({required_error:"petId is Required"}),
        petOwnershipExperience:z.string({required_error:"petOwnershipExperience is Requred"}),
        phonenumber:z.string({required_error:"petId is Required"})
    })


});

const updateAdoptionRequestValidation=z.object({
    body:z.object({
        status:z.enum([Status.APPROVED,Status.PENDING,Status.REJECTED])
    })
});


export const AdoptionRequestValidation={
    createAdoptionRequestValidation,
    updateAdoptionRequestValidation
}