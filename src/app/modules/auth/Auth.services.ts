import httpStatus from "http-status";
import ApiError from "../../error/ApiError";
import prisma from "../../shared/prisma";
import bcrypt from 'bcrypt';
import { jwtHalpers } from "../../helper/jwtHealpers";
import config from "../../config";
import { sendEmail } from "../../utility/sendEmail";
import { UserRole, UserStatus } from "@prisma/client";


// Node : Login Into Database Service Method
const LoginIntoDb=async(payload:{email:string,password:string})=>{


    const userData=await prisma.user.findUniqueOrThrow({
        where:{
            email:payload.email, 
            status:UserStatus.ACTIVE
        }
    });
  

    const isCorrectPassword:boolean=await bcrypt.compare(payload.password,userData.password);
    if(!isCorrectPassword)
    {
        throw new  ApiError(httpStatus.UNAUTHORIZED,"Password is Incorred","");

    }
    const accessToken=jwtHalpers.generateToken({email:userData.email,id:userData.id, role:userData.role},config.jwt_aceess_secret as string,config.jwt_expires_in as string);
    const refreshToken=jwtHalpers.generateToken({email:userData.email,id:userData.id, role:userData.role},config.jwt_refeesh_srcret as string,config.refresh_token_expire_in as string);
    const data={
        accessToken,
        needPasswordChange: userData.needPasswordChange,
        refreshToken
    }


    
    return data;
}

const changePasswordIntoDb=async(id:string,payload:{ newpassword:string,currentpassword:string})=>{


    const userData=await prisma.user.findUniqueOrThrow({
        where:{
            id
        }
    });
    if(!userData)
    {
        throw new ApiError(httpStatus.NOT_FOUND,"This User is Not Exist","");
    }

    const isCorrectPassword:boolean=await bcrypt.compare(payload.currentpassword,userData.password);
    if(!isCorrectPassword)
    {
        throw new ApiError(httpStatus.FORBIDDEN,"Password Encorred","");
    }
    const hashedPassword:string= await bcrypt.hash(payload.newpassword,Number(config.bcrypt_salt_rounds));
   
   const result= await prisma.user.update({
        where:{
            id
        },
        data:{
            password:hashedPassword,
            needPasswordChange:false
        }
    })
    
    return result;

}

const confirmationEmail=async(payload:{email:string})=>{

    const userData=await prisma.user.findUniqueOrThrow({
        where:{
          email:payload.email
        },
        select:{
            email:true,
            id:true,
            role:true
        }
    });

    let generateVarificationToken;
    if(userData?.id){
        generateVarificationToken={chnagePasswordToken:{
            email:userData.email,id:userData.id, role:userData.role
        },
        generateLink:config.chnage_password_link
    }
    }
    else{
        generateVarificationToken={registerToken:{
            email:payload.email
        },
        generateLink:config.varification_password_link
    }
}
    const resetPasswordToken=jwtHalpers.generateToken(generateVarificationToken.chnagePasswordToken as {id:string,email:string,role:UserRole},config.varification_token_srcret as string,config.varification_expire_in as string);
   // console.log(resetPasswordToken);
    const resetPasswordLink=generateVarificationToken.generateLink+`?id=${userData?.id}&token=${resetPasswordToken}`;
     await sendEmail(userData?.email,`
     <div>
     <p> Dear User</p>
     <p>Your Password Reset Link</p>
     <a href=${resetPasswordLink}>
      <button>Varification</button>
     </a>
     </div>`);

   return "Checked Your Email And Varified";
}

const refreshToken= async(token:string)=>{

    let decodedData;
    try{
     decodedData=jwtHalpers.varifyToken(token,config.jwt_refeesh_srcret as string)
   
    }
    catch(error)
    {
     throw new Error("You Are Not Authorization");
    }
 
    const isUserExit=await prisma.user.findUniqueOrThrow({
     where:{
         id:decodedData.id,
     }
    });

    
    const accessToken=jwtHalpers.generateToken({email:isUserExit.email,id:isUserExit.id, role:isUserExit.role},config.jwt_aceess_secret as string, config.jwt_expires_in as string);
   
    return {
     accessToken,
     needPasswordChange:isUserExit.needPasswordChange

     
    }
 }

export const AuthService={
    LoginIntoDb,
    changePasswordIntoDb,
    confirmationEmail,
    refreshToken
}