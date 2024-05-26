"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
//Node : Adoption Request Table All Validtion Mehtod At a Comman Spaces.
const createAdoptionRequestValidation = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({ required_error: "petId is Required" }),
        petOwnershipExperience: zod_1.z.string({ required_error: "petOwnershipExperience is Requred" }),
        phonenumber: zod_1.z.string({ required_error: "petId is Required" })
    })
});
const updateAdoptionRequestValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.Status.APPROVED, client_1.Status.PENDING, client_1.Status.REJECTED])
    })
});
exports.AdoptionRequestValidation = {
    createAdoptionRequestValidation,
    updateAdoptionRequestValidation
};
