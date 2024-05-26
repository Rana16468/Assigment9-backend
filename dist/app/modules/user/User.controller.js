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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const User_services_1 = require("./User.services");
const http_status_1 = __importDefault(require("http-status"));
const sendRespone_1 = __importDefault(require("../../shared/sendRespone"));
const Register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_services_1.UserService.RegisterIntoDb(req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.CREATED, message: "User registered successfully", data: result });
}));
// Node :Get Specific User Controller Method
const GetSpecificUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield User_services_1.UserService.GetSpecificUserIntoDb(id);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "User profile retrieved successfully", data: result });
}));
// Node : Update Specific User Controller Mehtod
const UpdateUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield User_services_1.UserService.UpdateUserInfoIntoDb(id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "User profile updated successfully", data: result });
}));
// AllUser
const AllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_services_1.UserService.AllUserFromDb();
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Get All User", data: result });
}));
const UpdateUserStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield User_services_1.UserService.UpdateUserStatusFormDb(id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Update Status", data: result });
}));
exports.UserController = {
    Register,
    GetSpecificUser,
    UpdateUserInfo,
    AllUser,
    UpdateUserStatus
};
