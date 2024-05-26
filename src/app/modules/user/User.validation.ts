
import { UserStatus } from '@prisma/client';
import {z} from 'zod';


const createRegisterValidation=z.object({
    body:z.object({
        name:z.string({required_error:"Name is Required"}),
        email:z.string({required_error:"Password is Required"}),
        password:z.string({required_error:"Password is Requred"}),
        role:z.enum([ "ADMIN","USER"])


    })
});

const UpdateUserInfoValidation=z.object({

    body:z.object({
        name:z.string({required_error:"Name is Required"}).optional(),
        email:z.string({required_error:"Password is Required"}).optional(),
       

    })
});

const UpdateUserStatusSchema=z.object({
    body:z.object({
        status:z.enum(["ACTIVE","DEACTIVATE"])
    })
})



export const  UserValidation={
    createRegisterValidation,
    UpdateUserInfoValidation,
    UpdateUserStatusSchema
}