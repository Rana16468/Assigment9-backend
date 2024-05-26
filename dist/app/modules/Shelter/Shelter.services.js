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
exports.ShelterService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CreateShelterIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            role: true
        }
    });
    if (isExistUser.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Admin Can Create Shelter", "");
    }
    // is it exist pet information 
    const isExistPet = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: payload.petId
        },
        select: {
            id: true
        }
    });
    if (!isExistPet) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Pet Information Not Exist in the Database", "");
    }
    const result = yield prisma_1.default.shelter.create({
        data: payload
    });
    return result;
});
const GetAllShelterIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.shelter.findMany({
        include: {
            pet: {
                include: {
                    photos: true,
                    adoptionRequests: true,
                    shelters: true
                }
            }
        }
    });
});
const GetSpecificShelterFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.shelter.findUniqueOrThrow({
        where: {
            id
        }
    });
});
const UpdateShelterFromDb = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }, select: { role: true }
    });
    if (isExistUser.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Admin Can be Updated", "");
    }
    const isShelterExist = yield prisma_1.default.shelter.findUniqueOrThrow({
        where: {
            id
        }, select: { id: true }
    });
    if (!isShelterExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Shelter Information Not Exist", "");
    }
    const result = yield prisma_1.default.shelter.update({
        where: {
            id
        },
        data: payload
    });
    return result;
});
const DeleteShelterFromDb = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }, select: { role: true }
    });
    if (isExistUser.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Admin Can be Updated", "");
    }
    const isShelterExist = yield prisma_1.default.shelter.findUniqueOrThrow({
        where: {
            id
        }, select: { id: true }
    });
    if (!isShelterExist) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Shelter Information Not Exist", "");
    }
    const result = yield prisma_1.default.shelter.delete({
        where: {
            id
        }
    });
    return result;
});
exports.ShelterService = {
    CreateShelterIntoDb,
    GetAllShelterIntoDb,
    GetSpecificShelterFromDb,
    UpdateShelterFromDb,
    DeleteShelterFromDb
};
