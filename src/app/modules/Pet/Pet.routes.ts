

import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import { PetController } from './Pet.controller';
import validateRequest from '../../middleware/validateRequest';
import { PetValidation } from './Pet.validation';


const router=express.Router();
router.patch("/:petId",auth(UserRole.ADMIN),validateRequest(PetValidation.updatePetValidation),PetController.updatePet);
router.get("/mypets",auth(UserRole.USER),PetController.MyPet);
router.get("/",auth(UserRole.ADMIN,UserRole.USER),PetController.getAllPets);
router.post("/",auth(UserRole.USER,UserRole.ADMIN),validateRequest(PetValidation.createPetValidation),PetController.createPet);
router.get("/:id",auth(UserRole.USER,UserRole.ADMIN),PetController.getAllSpecificPet);
router.delete("/:petId",auth(UserRole.ADMIN),PetController.deletePets);
router.delete("/photos/:photoId",auth(UserRole.ADMIN),PetController.deleteSpecificPhoto);


export const PetRouter=router;