import {z} from 'zod';
// Node : user Table All Validation at a comman spaces
const createLoginValodation=z.object({
    body:z.object({
        email:z.string({required_error:"Email is Required"}),
        password:z.string({required_error:"Password is Required"})
         })
});

const chnagePasswordValidation=z.object({
    body:z.object({
        currentpassword:z.string({required_error:"Current Password is Required"}).min(3).max(12),
        newpassword:z.string({required_error:"Current Password is Required"}).min(3).max(12)
    })
})


export const AuthValidation={
    createLoginValodation,
    chnagePasswordValidation
}