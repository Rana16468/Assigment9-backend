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
exports.AdoptionRequestService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const client_1 = require("@prisma/client");
const CreateAdoptionRequestIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            role: true
        }
    });
    if (isUserExist.role !== client_1.UserRole.USER) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Is Not Exist in the Database", "");
    }
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: payload.petId
        },
        select: {
            id: true
        }
    });
    const isExistPets = yield prisma_1.default.adoptionRequest.findMany({
        where: {
            petId: payload.petId
        },
        select: {
            petId: true
        }
    });
    if (isExistPets.length) {
        throw new ApiError_1.default(http_status_1.default.FOUND, 'This Requested Already Exist', '');
    }
    payload.userId = id;
    payload.petId = payload.petId;
    payload.petOwnershipExperience = payload.petOwnershipExperience;
    const result = yield prisma_1.default.adoptionRequest.create({
        data: payload
    });
    return result;
});
const getAllAdoptionRequestIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.adoptionRequest.findMany({
        include: {
            user: true
        }
    });
});
// Node : Update Adoption Request in specific pet Id Into Database
const updateAdoptionRequestIntoDb = (id, payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        select: {
            role: true
        }
    });
    if (isUserExist.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Admin Can be Update Adoption", "");
    }
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: { id }
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const deleteAdoptionRequestIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isAcceptedStatus = yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id
        },
    });
    if (isAcceptedStatus.status === client_1.Status.APPROVED) {
        throw new ApiError_1.default(http_status_1.default.FOUND, "PANDING And REJECTED  Status Deletable", "");
    }
    const deleteAdoptionRequest = prisma_1.default.adoptionRequest.delete({
        where: {
            id,
            status: client_1.Status.PENDING || client_1.Status.REJECTED
        }
    });
    return deleteAdoptionRequest;
});
// delete Adoption 
exports.AdoptionRequestService = {
    CreateAdoptionRequestIntoDb,
    getAllAdoptionRequestIntoDb,
    updateAdoptionRequestIntoDb,
    deleteAdoptionRequestIntoDb
};
