"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetValidation = void 0;
const zod_1 = require("zod");
// Enums
const Species = zod_1.z.enum(['cat', 'dog'], { required_error: "Species is Required" });
const Size = zod_1.z.enum(['small', 'medium', 'large'], { required_error: "Size is Required" });
const Healthstatus = zod_1.z.enum(['vaccinated', 'spayed', 'neutered'], { required_error: "Health Status is Required" });
const Specialneeds = zod_1.z.enum(['physical', 'behavioral', 'medical', 'dietary'], { required_error: "Specialneeds is Required" });
const Gender = zod_1.z.enum(['MALE', 'FEMALE']);
const PhotoSchema = zod_1.z.object({
    photo: zod_1.z.string().url().optional(),
    petId: zod_1.z.string().optional()
}).optional();
const createPetValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is Required" }).min(3, { message: "Minimun 3 Character Needeed" }).max(50, { message: "Maximun 50 Character Accepted" }),
        species: Species,
        breed: zod_1.z.string(),
        age: zod_1.z.string(),
        size: Size,
        location: zod_1.z.string(),
        description: zod_1.z.string(),
        temperament: zod_1.z.string(),
        medicalHistory: zod_1.z.string(),
        adoptionRequirements: zod_1.z.string(),
        healthstatus: Healthstatus,
        specialneeds: Specialneeds,
        gender: Gender,
        contractNumber: zod_1.z.string(),
        photos: zod_1.z.array(PhotoSchema).optional(),
    })
});
const SpeciesUpdate = zod_1.z.enum(['cat', 'dog'], { required_error: "Species is Required" }).optional();
const SizeUpdate = zod_1.z.enum(['small', 'medium', 'large'], { required_error: "Size is Required" }).optional();
const HealthstatusUpdate = zod_1.z.enum(['vaccinated', 'spayed', 'neutered'], { required_error: "Health Status is Required" }).optional();
const SpecialneedsUpdate = zod_1.z.enum(['physical', 'behavioral', 'medical', 'dietary'], { required_error: "Specialneeds is Required" }).optional();
const GenderUpdate = zod_1.z.enum(['MALE', 'FEMALE']).optional();
const PhotoSchemaUpdate = zod_1.z.object({
    photo: zod_1.z.string().url().optional(),
    id: zod_1.z.string().optional()
}).optional();
const updatePetValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is Required" }).min(3, { message: "Minimun 3 Character Needeed" }).max(50, { message: "Maximun 50 Character Accepted" }).optional(),
        species: SpeciesUpdate,
        breed: zod_1.z.string().optional(),
        age: zod_1.z.string().optional(),
        size: SizeUpdate,
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        temperament: zod_1.z.string().optional(),
        medicalHistory: zod_1.z.string().optional(),
        adoptionRequirements: zod_1.z.string().optional(),
        healthstatus: HealthstatusUpdate,
        specialneeds: SpecialneedsUpdate,
        gender: GenderUpdate,
        contractNumber: zod_1.z.string().optional(),
        photos: zod_1.z.array(PhotoSchemaUpdate).optional(),
    })
});
exports.PetValidation = {
    createPetValidation,
    updatePetValidation
};
