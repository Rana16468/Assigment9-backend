import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import config from "../../config";
import prisma from "../../shared/prisma";


const RegisterIntoDb=async(payload:User) =>{

    payload.password= await bcrypt.hash(payload.password as string,Number(config.bcrypt_salt_rounds));
    const register=await prisma.user.create({data:payload});
    return register
     
}

const GetSpecificUserIntoDb=async(id:string)=>{

    const result=await prisma.user.findUnique({
        where:{
            id
        }
    });
    return result;


}

const UpdateUserInfoIntoDb=async(id:string,payload:Partial<User>)=>{


    await prisma.user.findUniqueOrThrow({
        where:{
            id
        }
    });

    const result=await prisma.user.update({
        where:{
            id
        },
        data:payload
    })

    return result;
}

const AllUserFromDb=async()=>{

    const result=await prisma.user.findMany({});
    return result;
}

const UpdateUserStatusFormDb=async(id:string,payload:{status:any})=>{

   const result=await prisma.user.update({
    where:{
        id
    },
    data:{
        status:payload.status
    }
   });

    return result;
}

export const UserService={
    RegisterIntoDb,
    GetSpecificUserIntoDb,
    UpdateUserInfoIntoDb,
    AllUserFromDb,
    UpdateUserStatusFormDb
   
}
