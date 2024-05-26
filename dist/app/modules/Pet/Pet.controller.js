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
exports.PetController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const Pet_services_1 = require("./Pet.services");
const sendRespone_1 = __importDefault(require("../../shared/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../shared/pick"));
const Pet_constant_1 = require("./Pet.constant");
const createPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const result = yield Pet_services_1.PetService.createPetIntoDb(req.body, email);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.CREATED, message: "Pet added successfully", data: result });
}));
const getAllSpecificPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Pet_services_1.PetService.getAllSpecificPetIntoDb(req.params.id);
    (0, sendRespone_1.default)(res, { success: true, status: http_status_1.default.OK, message: "Get Specific Pet Successfully", data: result });
}));
const updatePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const { id } = req.user;
    const result = yield Pet_services_1.PetService.updatePetIntoDb(petId, id, req.body);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Pet profile updated successfully", data: result });
}));
const deletePets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    console.log(petId);
    const result = yield Pet_services_1.PetService.deletePetsFromDb(petId);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Pet Successfully Deleted", data: result });
}));
const deleteSpecificPhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { photoId } = req.params;
    const { id } = req.user;
    const result = yield Pet_services_1.PetService.deleteSpecificPhotosFromDb(photoId, id);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Photo Successfully Deleted", data: result });
}));
// Node : Get All  Pet Into Database Method
const getAllPets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, Pet_constant_1.petFilterableFields);
    const option = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = yield Pet_services_1.PetService.getAllPetsFromDb(filter, option);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Get All Pets Successfully", meta: result.meta, data: result.data });
}));
const MyPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const result = yield Pet_services_1.PetService.MyPetFromDb(id);
    (0, sendRespone_1.default)(res, { status: http_status_1.default.OK, success: true, message: "Successfully Get My Pets", data: result });
}));
exports.PetController = {
    createPet,
    getAllSpecificPet,
    updatePet,
    deletePets,
    deleteSpecificPhoto,
    getAllPets,
    MyPet
};
