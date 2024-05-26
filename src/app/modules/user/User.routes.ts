import { User } from '@prisma/client';
import express from 'express';
import { UserController } from './User.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './User.validation';
import { UserRole } from '@prisma/client';
import auth from '../../middleware/auth';

const router=express.Router();

router.post("/register",validateRequest(UserValidation.createRegisterValidation),UserController.Register);
router.get("/profile",auth(UserRole.ADMIN,UserRole.USER),UserController.GetSpecificUser);
router.put('/profile',auth(UserRole.ADMIN,UserRole.USER),validateRequest(UserValidation.UpdateUserInfoValidation),UserController.UpdateUserInfo);
router.get('/alluser',auth(UserRole.ADMIN),UserController.AllUser);
router.patch("/mystatus",auth(UserRole.ADMIN),validateRequest(UserValidation.UpdateUserStatusSchema),UserController.UpdateUserStatus);
export const UserRouter=router;