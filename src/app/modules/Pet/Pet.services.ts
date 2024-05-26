import { Pet, Photos, Prisma, Species, UserRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import ApiError from "../../error/ApiError";
import httpStatus from "http-status";
import { IPetFilterRequest } from "./Pet.interface";
import { IPaginationOptions } from "../../Interfaces/pagination";
import calculatePagination from "../../helper/paginationHelper";


const createPetIntoDb=async(payload:any ,email:string)=>{

    const {photos,...data}=payload;
    await prisma.user.findUniqueOrThrow({
         where:{
             email
         }
     });

   const createPetInformation=  await prisma.$transaction(async(tx)=>{

            const createPat=await tx.pet.create({
                data:data
            });
            
           const petPhoto=photos.map((photoUrl:{petId:string,photo:string}) => ({petId:createPat.id, photo: photoUrl.photo }))
           const photoResult= await tx.photos.createMany({
                data:petPhoto
            });
            return photoResult;


     });
     return  createPetInformation;

    
 }

 const getAllSpecificPetIntoDb=async(id:string)=>{

    const result=await prisma.pet.findUniqueOrThrow({
        where:{
            id,
        },
        include:{
            photos:true
        }
    });
    return result;
 }

 const updatePetIntoDb=async(id:string,userId:string,payload:any)=>{

    // is It Admin 
    const {photos,...data}=payload;
    const isAdmin=await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        },
        select:{
            role:true
        }
    });
    if(isAdmin.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"You Are Unauthorized Admin","");
    }
    // is Pet Is Exist Or Not 
    const isPatExist=await prisma.pet.findUniqueOrThrow({
        where:{
            id
        },
        select:{
            id:true
        }
    });
    if(!isPatExist)
    {
        throw new ApiError(httpStatus.NOT_FOUND,"This Pat is Not Founded","");
    }
     // update 
       if(data)
        {
            await prisma.pet.update({
                where:{
                    id
                },
                data
            });
        }
        if(photos)
        {
            photos.map(async(photoUrl:{id:string,photo:string}) => {
              
                 await prisma.photos.update({
                    where:{
                        id:photoUrl.id
                    },data:{
                        photo:photoUrl.photo
                    }
                 })
            });
           
        }
        const result=await prisma.pet.findFirstOrThrow({
            where:{
                id
            },
            include:{
                photos:true
            }
        });

     return result;
 }
 // start delet method

 const deletePetsFromDb=async(id:string)=>{




 

   const resuult=await prisma.$transaction(async(tx)=>{

        const deletePhotos=await tx.photos.deleteMany({
            where:{
                petId:id
            }
        });
        if(!deletePhotos.count)
        {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Some Issues By the photos Table","");
        }
        // const deleteShelter=await tx.shelter.delete({
        //     where:{
        //         petId:id
        //     }
        // });
        // if(!deleteShelter)
        // {
        //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Some Issues By the Shelter Table","");
        // }

        const petAdoptionRequestDelete=await tx.adoptionRequest.deleteMany({
            where:{
                petId:id
            }
        });
        if(!petAdoptionRequestDelete.count)
        {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Some Issues By the Adoption Request Table","");
        }
        const deletePets=await tx.pet.delete({
            where:{
                id
            }
        });
        if(!deletePets)
         {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Some Issues By the Pets Table","");
         }   
       return deletePets;

    });
    return resuult;

 }

 const deleteSpecificPhotosFromDb=async(photoId:string,id:string)=>{

    // isIt Admin 

    const isAdmin=await prisma.user.findUniqueOrThrow({
        where:{
            id
        },
        select:{
            role:true
        }
    });
    if(isAdmin.role!==UserRole.ADMIN)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,"You Are Unauthorized Admin","");
    }
   // isExist Photoes
    const isExistPhoto=await prisma.photos.findUniqueOrThrow({
        where:{
            id:photoId
        }
    });
    if(!isExistPhoto)
     {
        throw new ApiError(httpStatus.NOT_FOUND,"This Pets Not Exist in the Database","");
     }

     // delete photoes
     const result=await prisma.photos.delete({
        where:{
            id:photoId
        }
     });
     return result


 }

 const getAllPetsFromDb=async(params:IPetFilterRequest,option:IPaginationOptions)=>{

    const {searchTerm,...filterData}=params

    const {limit,page,sortBy,sortOrder,skip}=calculatePagination(option);

if(filterData.age)
{
    filterData.age=Number(filterData.age)
}

 const andCondition:Prisma.PetWhereInput[]=[];

 //console.log(filterData);

if(searchTerm)
{
    andCondition.push( {
       OR:[
        {
            breed:{
                contains:params.searchTerm,
                mode:"insensitive"
            }
        },
        {
            location:{
                contains:params.searchTerm,
                mode:"insensitive"
            }
        },
        {
            species:{
                equals:params.searchTerm===Species.cat?Species.cat:Species.dog

            }
        },
        {
            age:{
                contains:params.searchTerm,
                mode:"insensitive"
            }
        }
       
        
       ]
})
}

if(Object.values(filterData).length>0)
{
    andCondition.push({
        AND:Object.keys(filterData).map((field)=>({
            [field]:{
                   equals:(filterData as any)[field]

            }
        }))
    })
}




const whereCondition={AND:andCondition}

const result=await prisma.pet.findMany({
    where:whereCondition,
    include:{
        photos:true
    },
    skip,
    take:limit,
    orderBy: sortBy && sortOrder?{
       [sortBy]:sortOrder
    }:{
       createdAt:"desc"
    }
});

const total=await prisma.pet.count({
   where:whereCondition

  
});
return {
   meta:{
       page,
       limit,
       total
       
   },
   data:result
};

 }

 const MyPetFromDb=async(id:string)=>{

    const result=await prisma.user.findMany({
        where:{
            id
        },
        include:{
            adoptionRequests:{
                include:{
                    pet:{
                        include:{
                            photos:true,
                            adoptionRequests:true,
                            shelters:true
                        }
                    },
                    
                }
            }
        }
    });
    return result
 }

 export  const PetService={
    createPetIntoDb,
    getAllSpecificPetIntoDb,
    updatePetIntoDb,
    deletePetsFromDb,
    deleteSpecificPhotosFromDb,
    getAllPetsFromDb,
    MyPetFromDb
 }

 