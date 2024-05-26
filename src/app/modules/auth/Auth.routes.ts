import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './Auth.validation';
import { AuthController } from './Auth.controller';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router=express.Router();
router.post("/login",validateRequest(AuthValidation.createLoginValodation),AuthController.Login);
router.post('/chnage-password',auth(UserRole.ADMIN,UserRole.USER),validateRequest(AuthValidation.chnagePasswordValidation),AuthController.ChangePassword);
router.post("/varification",AuthController.confirmationEmail);
router.post('/refreshToken',AuthController.refreshToken);
export const AuthRouter=router;
