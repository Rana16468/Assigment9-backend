"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const User_validation_1 = require("./User.validation");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(User_validation_1.UserValidation.createRegisterValidation), User_controller_1.UserController.Register);
router.get("/profile", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), User_controller_1.UserController.GetSpecificUser);
router.put('/profile', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(User_validation_1.UserValidation.UpdateUserInfoValidation), User_controller_1.UserController.UpdateUserInfo);
router.get('/alluser', (0, auth_1.default)(client_1.UserRole.ADMIN), User_controller_1.UserController.AllUser);
router.patch("/mystatus", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(User_validation_1.UserValidation.UpdateUserStatusSchema), User_controller_1.UserController.UpdateUserStatus);
exports.UserRouter = router;
