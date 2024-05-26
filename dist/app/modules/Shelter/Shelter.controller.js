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
exports.ShelterController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Shelter_services_1 = require("./Shelter.services");
const sendRespone_1 = __importDefault(require("../../shared/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const CreateShelter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield Shelter_services_1.ShelterService.CreateShelterIntoDb(id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.CREATED, message: "Successfully Created Shelter", data: result });
}));
const GetAllShelter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Shelter_services_1.ShelterService.GetAllShelterIntoDb();
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Find All Shelter", data: result });
}));
const GetSpecificShelter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Shelter_services_1.ShelterService.GetSpecificShelterFromDb(req.params.id);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Find Specific Shelter", data: result });
}));
const UpdateShelter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shelterId } = req.params;
    const { id } = req.user;
    const result = yield Shelter_services_1.ShelterService.UpdateShelterFromDb(shelterId, id, req.body);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Updated Shelter", data: result });
}));
const DeleteShelter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shelterId } = req.params;
    const { id } = req.user;
    const result = yield Shelter_services_1.ShelterService.DeleteShelterFromDb(shelterId, id);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Successfully Deleted Shelter", data: result });
}));
exports.ShelterController = {
    CreateShelter,
    GetAllShelter,
    GetSpecificShelter,
    UpdateShelter,
    DeleteShelter
};
