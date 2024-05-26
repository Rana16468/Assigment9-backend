import express from  'express';
import { UserRouter } from '../modules/user/User.routes';
import { AuthRouter } from '../modules/auth/Auth.routes';
import { PetRouter } from '../modules/Pet/Pet.routes';
import { AdoptionRequestRouter } from '../modules/AdoptionRequest/Adoption.routes';
import { ShelterRouter } from '../modules/Shelter/Shelter.routes';



const router=express.Router();

const moduleRoutes=[

    {path:"/user", route:UserRouter},
    {path:"/auth",route:AuthRouter},
    {path:"/pats",route:PetRouter},
    {path:"/adoption",route:AdoptionRequestRouter},
    {path:"/shelter",route:ShelterRouter}
   

    
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))

export default router;