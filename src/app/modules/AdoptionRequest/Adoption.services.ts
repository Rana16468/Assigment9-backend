import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import { AdoptionRequest, Status, UserRole } from "@prisma/client";

const CreateAdoptionRequestIntoDb=async(id:string,payload:AdoptionRequest)=>{

    const isUserExist= await prisma.user.findUniqueOrThrow({
         where:{
             id
         },
         select:{
            role:true
         }
     });
     if(isUserExist.role!==UserRole.USER)
     {
       throw new ApiError(httpStatus.NOT_FOUND,"User Is Not Exist in the Database","");
     }
  
   await prisma.pet.findUniqueOrThrow({
         where:{
             id:payload.petId
         },
         select:{
             id:true
         }
     });
 

 
     const isExistPets= await prisma.adoptionRequest.findMany({
         where :{
             petId:payload.petId
         },
         select:{
             petId:true
         }
     })
     if(isExistPets.length)
     {
         throw new ApiError(httpStatus.FOUND,'This Requested Already Exist','');
     }
 
     payload.userId=id;
     payload.petId=payload.petId;
     payload.petOwnershipExperience=payload.petOwnershipExperience;
 
     const result=await prisma.adoptionRequest.create({
         data:payload
     });
 
     return result  
 }

 const getAllAdoptionRequestIntoDb=async()=>{

    return await prisma.adoptionRequest.findMany({
        include:{
            user:true
        }
    });
}

// Node : Update Adoption Request in specific pet Id Into Database
const updateAdoptionRequestIntoDb=async(id:string,payload:Partial<AdoptionRequest>,userId:string)=>{

    const isUserExist=await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        },
        select:{
            role:true
        }
    });
    if(isUserExist.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"Admin Can be Update Adoption","");
    }

    await prisma.adoptionRequest.findUniqueOrThrow({
        where:{ id}
    });
    const result=await prisma.adoptionRequest.update({
        where:{
            id
        },
        data:payload
    })
    return result
}


const deleteAdoptionRequestIntoDb=async(id:string)=>{

    const isAcceptedStatus=await prisma.adoptionRequest.findUniqueOrThrow({
        where:{
            id
        },
      
    });
        if(isAcceptedStatus.status===Status.APPROVED)
        {
            throw new ApiError(httpStatus.FOUND,"PANDING And REJECTED  Status Deletable","")
        }

    
    const deleteAdoptionRequest=prisma.adoptionRequest.delete({
        where:{
            id,
            status:Status.PENDING || Status.REJECTED
        }
    })
     return deleteAdoptionRequest

}

// delete Adoption 

 export const AdoptionRequestService={
    CreateAdoptionRequestIntoDb,
    getAllAdoptionRequestIntoDb,
    updateAdoptionRequestIntoDb,
    deleteAdoptionRequestIntoDb
 }