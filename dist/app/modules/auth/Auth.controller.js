"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Auth_services_1 = require("./Auth.services");
const sendRespone_1 = __importDefault(require("../../shared/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const Login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth_services_1.AuthService.LoginIntoDb(req.body);
    const { refreshToken, accessToken, needPasswordChange } = result;
    res.cookie(config_1.default.refresh_token, refreshToken, { secure: false, httpOnly: true });
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "User logged in successfully", data: {
            accessToken,
            needPasswordChange
        } });
}));
const ChangePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield Auth_services_1.AuthService.changePasswordIntoDb(id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Password Chnage successfully", data: result });
}));
const confirmationEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth_services_1.AuthService.confirmationEmail(req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Varified Your Email", data: result });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //https://www.npmjs.com/package/cookie-parser
    const { refreshToken } = req.cookies;
    const result = yield Auth_services_1.AuthService.refreshToken(refreshToken);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Refresh Token Get Successfully", data: result });
}));
exports.AuthController = {
    Login,
    ChangePassword,
    confirmationEmail,
    refreshToken
};
