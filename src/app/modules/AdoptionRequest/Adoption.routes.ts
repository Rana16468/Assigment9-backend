import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middleware/validateRequest';
import { AdoptionRequestValidation } from './Adoption.validation';
import { AdoptionRequestController } from './Adoption.controller';

const router=express.Router();

//Node :  Adoption Request Table Router at all.
router.post("/",auth(UserRole.USER),validateRequest(AdoptionRequestValidation.createAdoptionRequestValidation),AdoptionRequestController.CreateAdoptionRequest);
router.get("/",auth(UserRole.ADMIN),AdoptionRequestController.getAllAdoptionRequest);
router.put("/:requestId",auth(UserRole.ADMIN),validateRequest(AdoptionRequestValidation.updateAdoptionRequestValidation),AdoptionRequestController.updateAdoptionRequest);
router.delete("/:requestId",auth(UserRole.ADMIN,UserRole.USER),AdoptionRequestController.deleteAdoptionRequest);
export const AdoptionRequestRouter=router