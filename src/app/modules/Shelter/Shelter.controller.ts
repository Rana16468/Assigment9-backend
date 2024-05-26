import { RequestHandler } from "express";
import catchAsync from "../../shared/catchAsync";
import { ShelterService } from "./Shelter.services";
import sendRespone from "../../shared/sendRespone";
import httpStatus from "http-status";



const CreateShelter:RequestHandler=catchAsync(async(req,res)=>{
    
    const {id}=req.user;
    const result=await ShelterService.CreateShelterIntoDb(id,req.body);
    sendRespone(res,{success:true,status:httpStatus.CREATED,message:"Successfully Created Shelter",data:result});
});

const GetAllShelter:RequestHandler=catchAsync(async(req,res)=>{

    const result=await ShelterService.GetAllShelterIntoDb();
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Find All Shelter",data:result});
});
const  GetSpecificShelter:RequestHandler=catchAsync(async(req,res)=>{
    const result=await ShelterService.GetSpecificShelterFromDb(req.params.id);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Find Specific Shelter",data:result});
});

const  UpdateShelter:RequestHandler=catchAsync(async(req,res)=>{

   const {shelterId}=req.params;
   const  {id}=req.user;
    const result=await ShelterService.UpdateShelterFromDb(shelterId,id,req.body);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Updated Shelter",data:result});
});

const DeleteShelter:RequestHandler=catchAsync(async(req,res)=>{
    const {shelterId}=req.params;
    const  {id}=req.user;
    const result=await ShelterService.DeleteShelterFromDb(shelterId,id);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Deleted Shelter",data:result});

});



export const ShelterController={
    CreateShelter,
    GetAllShelter,
    GetSpecificShelter,
    UpdateShelter,
    DeleteShelter
}