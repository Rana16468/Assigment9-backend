

import { z } from 'zod';

// Shelter schema
const ShelterSchema = z.object({
         body:z.object({
            petId: z.string().uuid({message:"petId is Unique"}),
            name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }),
            contactInfo: z.string({ required_error: "Contact Info is required" }).min(1, { message: "Contact Info cannot be empty" })
         })
});

const ShelterUpdateSchema = z.object({
    body:z.object({
       name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }).optional(),
       contactInfo: z.string({ required_error: "Contact Info is required" }).min(1, { message: "Contact Info cannot be empty" }).optional()
    })
});

export const ShelterValidationSchema={
    ShelterSchema,
    ShelterUpdateSchema
}