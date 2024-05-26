"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.createLoginValodation), Auth_controller_1.AuthController.Login);
router.post('/chnage-password', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(Auth_validation_1.AuthValidation.chnagePasswordValidation), Auth_controller_1.AuthController.ChangePassword);
router.post("/varification", Auth_controller_1.AuthController.confirmationEmail);
router.post('/refreshToken', Auth_controller_1.AuthController.refreshToken);
exports.AuthRouter = router;
