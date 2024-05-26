import { RequestHandler } from "express";
import catchAsync from "../../shared/catchAsync";
import { PetService } from "./Pet.services";
import sendRespone from "../../shared/sendRespone";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { petFilterableFields } from "./Pet.constant";


const createPet:RequestHandler=catchAsync(async(req,res)=>{
  

    const {email}=req.user;

    const result=await PetService.createPetIntoDb(req.body,email);
    sendRespone(res,{success:true,status:httpStatus.CREATED,message:"Pet added successfully",data:result});
});

const  getAllSpecificPet:RequestHandler=catchAsync(async(req,res)=>{
 
    const result=await PetService.getAllSpecificPetIntoDb(req.params.id);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Get Specific Pet Successfully",data:result});


});

const  updatePet:RequestHandler=catchAsync(async(req,res)=>{

    const {petId}=req.params;
    const {id}=req.user;
    const result=await PetService.updatePetIntoDb(petId,id,req.body);
    sendRespone(res,{status:httpStatus.OK,success:true,message:"Pet profile updated successfully",data:result})
});

const  deletePets:RequestHandler=catchAsync(async(req,res)=>{
    const {petId}=req.params;

    console.log(petId);

    const result=await PetService.deletePetsFromDb(petId);
    sendRespone(res,{status:httpStatus.OK,success:true,message:"Pet Successfully Deleted",data:result})

});

const  deleteSpecificPhoto:RequestHandler=catchAsync(async(req,res)=>{
    const {photoId}=req.params;
    const {id}=req.user;
    const result=await PetService.deleteSpecificPhotosFromDb(photoId,id);
    sendRespone(res,{status:httpStatus.OK,success:true,message:"Photo Successfully Deleted",data:result})


});
// Node : Get All  Pet Into Database Method
const getAllPets:RequestHandler=catchAsync(async(req,res)=>{

        const filter= pick(req.query,petFilterableFields);

        const option=pick(req.query,['page','limit','sortBy','sortOrder']);

        const result=await PetService.getAllPetsFromDb(filter,option)
       
        sendRespone(res,{status:httpStatus.OK,success:true,message:"Get All Pets Successfully",meta:result.meta,data:result.data})
    });

const  MyPet:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const result=await PetService.MyPetFromDb(id);
    sendRespone(res,{status:httpStatus.OK,success:true,message:"Successfully Get My Pets",data:result});


});


export const PetController={
    createPet,
    getAllSpecificPet,
    updatePet,
    deletePets,
    deleteSpecificPhoto,
    getAllPets,
    MyPet

}