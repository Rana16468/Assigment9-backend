import { z } from 'zod';

// Enums
const Species = z.enum(['cat', 'dog'],{required_error:"Species is Required"});
const Size = z.enum(['small', 'medium', 'large'],{required_error:"Size is Required"});
const Healthstatus = z.enum(['vaccinated', 'spayed', 'neutered'],{required_error:"Health Status is Required"});
const  Specialneeds=z.enum([ 'physical','behavioral','medical','dietary'],{required_error:"Specialneeds is Required"});
const Gender=z.enum(['MALE','FEMALE']);
const PhotoSchema = z.object({
    photo  : z.string().url().optional(),
    petId :z.string().optional()


  }).optional();

const createPetValidation=z.object({
    body:z.object({

        name: z.string({required_error:"Name is Required"}).min(3,{message:"Minimun 3 Character Needeed"}).max(50,{message:"Maximun 50 Character Accepted"}),
        species: Species,
        breed: z.string(),
        age: z.string(),
        size: Size,
        location: z.string(),
        description: z.string(),
        temperament: z.string(),
        medicalHistory: z.string(),
        adoptionRequirements: z.string(),
        healthstatus: Healthstatus,
        specialneeds: Specialneeds,
        gender:Gender,
        contractNumber: z.string(),
        photos: z.array(PhotoSchema).optional(),
         })
});

const SpeciesUpdate = z.enum(['cat', 'dog'],{required_error:"Species is Required"}).optional();
const SizeUpdate = z.enum(['small', 'medium', 'large'],{required_error:"Size is Required"}).optional();
const HealthstatusUpdate = z.enum(['vaccinated', 'spayed', 'neutered'],{required_error:"Health Status is Required"}).optional();
const  SpecialneedsUpdate=z.enum([ 'physical','behavioral','medical','dietary'],{required_error:"Specialneeds is Required"}).optional();
const GenderUpdate=z.enum(['MALE','FEMALE']).optional();

const PhotoSchemaUpdate = z.object({
    photo  : z.string().url().optional(),
    id :z.string().optional()

  }).optional();
const updatePetValidation=z.object({

    body:z.object({

        name: z.string({required_error:"Name is Required"}).min(3,{message:"Minimun 3 Character Needeed"}).max(50,{message:"Maximun 50 Character Accepted"}).optional(),
        species: SpeciesUpdate,
        breed: z.string().optional(),
        age: z.string().optional(),
        size: SizeUpdate,
        location: z.string().optional(),
        description: z.string().optional(),
        temperament: z.string().optional(),
        medicalHistory: z.string().optional(),
        adoptionRequirements: z.string().optional(),
        healthstatus: HealthstatusUpdate,
        specialneeds: SpecialneedsUpdate,
        gender:GenderUpdate,
        contractNumber: z.string().optional(),
        photos: z.array(PhotoSchemaUpdate).optional(),
         })
    })

export const PetValidation={
    createPetValidation,
    updatePetValidation
    
}