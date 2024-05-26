"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShelterValidationSchema = void 0;
const zod_1 = require("zod");
// Shelter schema
const ShelterSchema = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string().uuid({ message: "petId is Unique" }),
        name: zod_1.z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }),
        contactInfo: zod_1.z.string({ required_error: "Contact Info is required" }).min(1, { message: "Contact Info cannot be empty" })
    })
});
const ShelterUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }).optional(),
        contactInfo: zod_1.z.string({ required_error: "Contact Info is required" }).min(1, { message: "Contact Info cannot be empty" }).optional()
    })
});
exports.ShelterValidationSchema = {
    ShelterSchema,
    ShelterUpdateSchema
};
