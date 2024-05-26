import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middleware/validateRequest';
import { ShelterValidationSchema } from './Shelter.validation';
import { ShelterController } from './Shelter.controller';

const router=express.Router();
router.post("/",auth(UserRole.ADMIN),validateRequest(ShelterValidationSchema.ShelterSchema),ShelterController.CreateShelter);
router.get("/",auth(UserRole.ADMIN),ShelterController.GetAllShelter);
router.get("/:id",auth(UserRole.ADMIN,UserRole.USER),ShelterController.GetSpecificShelter);
router.patch("/:shelterId",auth(UserRole.ADMIN),ShelterController.UpdateShelter);
router.delete("/:shelterId",auth(UserRole.ADMIN),ShelterController.DeleteShelter);
export const ShelterRouter=router;