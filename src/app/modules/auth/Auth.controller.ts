import { RequestHandler } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "./Auth.services";
import sendRespone from "../../shared/sendRespone";
import httpStatus from "http-status";
import config from "../../config";


const Login:RequestHandler=catchAsync(async(req,res)=>{

    const result=await AuthService.LoginIntoDb(req.body);
    const {refreshToken, accessToken, needPasswordChange}=result;
    res.cookie(config.refresh_token as string,refreshToken,{secure:false,httpOnly:true});
    sendRespone(res,{success:true,status:httpStatus.OK,message:"User logged in successfully",data:{
        accessToken,
        needPasswordChange
    }})

});


const ChangePassword:RequestHandler=catchAsync(async(req,res)=>{

    const {id}=req.user;

    const result=await AuthService.changePasswordIntoDb(id,req.body);
    sendRespone(res,{success:true,status:httpStatus.OK,message:"Password Chnage successfully",data:result})

});

const confirmationEmail:RequestHandler=catchAsync(async(req,res)=>{
  const result=await AuthService.confirmationEmail(req.body);
  sendRespone(res,{success:true,status:httpStatus.OK,message:"Varified Your Email",data:result});
});

const  refreshToken:RequestHandler=catchAsync(async(req,res)=>{
    //https://www.npmjs.com/package/cookie-parser
        const {refreshToken}=req.cookies;
        const result=await AuthService.refreshToken(refreshToken);
        sendRespone(res,{status:httpStatus.OK,success:true,message:"Refresh Token Get Successfully",data:result})
    
    
    
    });
export const AuthController={
    Login,
    ChangePassword,
    confirmationEmail,
    refreshToken
    
    
}