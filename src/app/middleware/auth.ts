
import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import ApiError from "../error/ApiError";
import httpStatus from "http-status";
import { jwtHalpers } from "../helper/jwtHealpers";
import config from "../config";


//NODE:: Authentigation Function 
const auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
  try{

    const token=req.headers.authorization;
    if(!token)
    {
        throw new ApiError(httpStatus.UNAUTHORIZED,'You are not Authorized Token','');
    }
   const varifiedUser=jwtHalpers.varifyToken(token,config.jwt_aceess_secret as Secret);

   req.user=varifiedUser;
   if(roles.length && !roles.includes(varifiedUser.role))
    {
     throw new ApiError(httpStatus.FORBIDDEN,'You are not Authorized Roll','');
    }
  
   next();
  }
  catch(error)
  {
     next(error);
  }
       
 }


}

export default auth;