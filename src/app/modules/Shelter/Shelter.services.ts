import { Shelter, UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";


const CreateShelterIntoDb=async(id:string,payload:Shelter)=>{
    const isExistUser=await prisma.user.findUniqueOrThrow({
        where:{
            id
        },
        select:{
            role:true
        }
    });
    if(isExistUser.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Admin Can Create Shelter","");
    }
    // is it exist pet information 
    const isExistPet=await prisma.pet.findUniqueOrThrow({
        where:{
            id:payload.petId
        },
        select:{
            id:true
        }
    });
    if(!isExistPet)
     {
        throw new ApiError(httpStatus.NOT_FOUND,"Pet Information Not Exist in the Database","");
     }
    const result=await prisma.shelter.create({
        data:payload
    });
    return result;
}

const GetAllShelterIntoDb=async()=>{

    return await prisma.shelter.findMany({
        include:{
            pet:{
                include:{
                   photos:true,
                    adoptionRequests:true,
                    shelters:true
                }
            }
        }
    })
}

const GetSpecificShelterFromDb=async(id:string)=>{

    return await prisma.shelter.findUniqueOrThrow({
        where:{
            id
        }
        
    });
}

const UpdateShelterFromDb=async(id:string,userId:string,payload:Shelter)=>{

    const isExistUser=await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        },select:{role:true}
    });
    if(isExistUser.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Admin Can be Updated","");
    }
    const isShelterExist=await prisma.shelter.findUniqueOrThrow({
        where:{
            id
        },select:{id:true}
    });
    if(!isShelterExist)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Shelter Information Not Exist","");
    }
    const result=await prisma.shelter.update({
        where:{
            id
        },
        data:payload
    });

    return result;
}

const DeleteShelterFromDb=async(id:string,userId:string)=>{

    const isExistUser=await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        },select:{role:true}
    });
    if(isExistUser.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Admin Can be Updated","");
    }
    const isShelterExist=await prisma.shelter.findUniqueOrThrow({
        where:{
            id
        },select:{id:true}
    });
    if(!isShelterExist)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Shelter Information Not Exist","");
    }
    const result=await prisma.shelter.delete({
        where:{
            id
        }
    });
   return result;
}




export const ShelterService={
    CreateShelterIntoDb,
    GetAllShelterIntoDb,
    GetSpecificShelterFromDb,
    UpdateShelterFromDb,
    DeleteShelterFromDb
}