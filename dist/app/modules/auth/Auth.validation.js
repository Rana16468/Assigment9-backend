"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// Node : user Table All Validation at a comman spaces
const createLoginValodation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is Required" }),
        password: zod_1.z.string({ required_error: "Password is Required" })
    })
});
const chnagePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        currentpassword: zod_1.z.string({ required_error: "Current Password is Required" }).min(3).max(12),
        newpassword: zod_1.z.string({ required_error: "Current Password is Required" }).min(3).max(12)
    })
});
exports.AuthValidation = {
    createLoginValodation,
    chnagePasswordValidation
};
