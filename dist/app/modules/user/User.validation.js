"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createRegisterValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is Required" }),
        email: zod_1.z.string({ required_error: "Password is Required" }),
        password: zod_1.z.string({ required_error: "Password is Requred" }),
        role: zod_1.z.enum(["ADMIN", "USER"])
    })
});
const UpdateUserInfoValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is Required" }).optional(),
        email: zod_1.z.string({ required_error: "Password is Required" }).optional(),
    })
});
const UpdateUserStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["ACTIVE", "DEACTIVATE"])
    })
});
exports.UserValidation = {
    createRegisterValidation,
    UpdateUserInfoValidation,
    UpdateUserStatusSchema
};
