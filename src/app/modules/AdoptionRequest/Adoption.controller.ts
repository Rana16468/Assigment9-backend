import { RequestHandler } from "express";
import catchAsync from "../../shared/catchAsync";
import { AdoptionRequestService } from "./Adoption.services";
import httpStatus from "http-status";
import sendRespone from "../../shared/sendRespone";


const  CreateAdoptionRequest:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const result=await AdoptionRequestService.CreateAdoptionRequestIntoDb(id,req.body);
    sendRespone(res,{success:true,status:httpStatus.CREATED,message:"Adoption request submitted successfully",data:result});
});

const getAllAdoptionRequest:RequestHandler=catchAsync(async(req,res)=>{

    const result=await AdoptionRequestService.getAllAdoptionRequestIntoDb();
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Adoption requests retrieved successfully",data:result});
});

const  updateAdoptionRequest:RequestHandler=catchAsync(async(req,res)=>{

    const {requestId}=req.params;
    const {id}=req.user;
    const result=await AdoptionRequestService.updateAdoptionRequestIntoDb(requestId,req.body,id);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Adoption request updated successfully",data:result})
});

const deleteAdoptionRequest:RequestHandler=catchAsync(async(req,res)=>{

    const {requestId}=req.params;

    const result=await AdoptionRequestService.deleteAdoptionRequestIntoDb(requestId);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Adoption Deleted successfully",data:result})

})



export const AdoptionRequestController={
    CreateAdoptionRequest,
    getAllAdoptionRequest,
    updateAdoptionRequest,
    deleteAdoptionRequest
}