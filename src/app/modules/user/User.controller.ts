import { RequestHandler } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./User.services";
import httpStatus from "http-status";
import sendRespone from "../../shared/sendRespone";

const  Register:RequestHandler=catchAsync(async(req,res)=>{

  
    const result=await UserService.RegisterIntoDb(req.body);
    sendRespone(res,{success:true,status:httpStatus.CREATED,message:"User registered successfully",data:result})


});

// Node :Get Specific User Controller Method
const GetSpecificUser:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;

    const result=await UserService.GetSpecificUserIntoDb(id);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"User profile retrieved successfully",data:result});


});

// Node : Update Specific User Controller Mehtod
const  UpdateUserInfo:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;
    const result=await UserService.UpdateUserInfoIntoDb(id,req.body);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"User profile updated successfully",data:result});
});
// AllUser
const AllUser:RequestHandler=catchAsync(async(req,res)=>{

    const result=await UserService.AllUserFromDb();
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Get All User",data:result});
});
const   UpdateUserStatus:RequestHandler=catchAsync(async(req,res)=>{
    const {id}=req.user;
    const result=await UserService. UpdateUserStatusFormDb(id,req.body);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Successfully Update Status",data:result});
})

export const UserController={
    Register,
    GetSpecificUser,
    UpdateUserInfo,
    AllUser,
    UpdateUserStatus
   
}