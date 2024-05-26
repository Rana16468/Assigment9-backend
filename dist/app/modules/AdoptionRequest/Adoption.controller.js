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
exports.AdoptionRequestController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Adoption_services_1 = require("./Adoption.services");
const http_status_1 = __importDefault(require("http-status"));
const sendRespone_1 = __importDefault(require("../../shared/sendRespone"));
const CreateAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield Adoption_services_1.AdoptionRequestService.CreateAdoptionRequestIntoDb(id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.CREATED, message: "Adoption request submitted successfully", data: result });
}));
const getAllAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Adoption_services_1.AdoptionRequestService.getAllAdoptionRequestIntoDb();
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Adoption requests retrieved successfully", data: result });
}));
const updateAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const { id } = req.user;
    const result = yield Adoption_services_1.AdoptionRequestService.updateAdoptionRequestIntoDb(requestId, req.body, id);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Adoption request updated successfully", data: result });
}));
const deleteAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield Adoption_services_1.AdoptionRequestService.deleteAdoptionRequestIntoDb(requestId);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Adoption Deleted successfully", data: result });
}));
exports.AdoptionRequestController = {
    CreateAdoptionRequest,
    getAllAdoptionRequest,
    updateAdoptionRequest,
    deleteAdoptionRequest
};
