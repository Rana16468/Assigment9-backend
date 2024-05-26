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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = __importDefault(require("../../helper/paginationHelper"));
const createPetIntoDb = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const { photos } = payload, data = __rest(payload, ["photos"]);
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email
        }
    });
    const createPetInformation = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createPat = yield tx.pet.create({
            data: data
        });
        const petPhoto = photos.map((photoUrl) => ({ petId: createPat.id, photo: photoUrl.photo }));
        const photoResult = yield tx.photos.createMany({
            data: petPhoto
        });
        return photoResult;
    }));
    return createPetInformation;
});
const getAllSpecificPetIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            photos: true
        }
    });
    return result;
});
const updatePetIntoDb = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // is It Admin 
    const { photos } = payload, data = __rest(payload, ["photos"]);
    const isAdmin = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        select: {
            role: true
        }
    });
    if (isAdmin.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You Are Unauthorized Admin", "");
    }
    // is Pet Is Exist Or Not 
    const isPatExist = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true
        }
    });
    if (!isPatExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This Pat is Not Founded", "");
    }
    // update 
    if (data) {
        yield prisma_1.default.pet.update({
            where: {
                id
            },
            data
        });
    }
    if (photos) {
        photos.map((photoUrl) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma_1.default.photos.update({
                where: {
                    id: photoUrl.id
                }, data: {
                    photo: photoUrl.photo
                }
            });
        }));
    }
    const result = yield prisma_1.default.pet.findFirstOrThrow({
        where: {
            id
        },
        include: {
            photos: true
        }
    });
    return result;
});
// start delet method
const deletePetsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resuult = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const deletePhotos = yield tx.photos.deleteMany({
            where: {
                petId: id
            }
        });
        if (!deletePhotos.count) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Some Issues By the photos Table", "");
        }
        // const deleteShelter=await tx.shelter.delete({
        //     where:{
        //         petId:id
        //     }
        // });
        // if(!deleteShelter)
        // {
        //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Some Issues By the Shelter Table","");
        // }
        const petAdoptionRequestDelete = yield tx.adoptionRequest.deleteMany({
            where: {
                petId: id
            }
        });
        if (!petAdoptionRequestDelete.count) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Some Issues By the Adoption Request Table", "");
        }
        const deletePets = yield tx.pet.delete({
            where: {
                id
            }
        });
        if (!deletePets) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Some Issues By the Pets Table", "");
        }
        return deletePets;
    }));
    return resuult;
});
const deleteSpecificPhotosFromDb = (photoId, id) => __awaiter(void 0, void 0, void 0, function* () {
    // isIt Admin 
    const isAdmin = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            role: true
        }
    });
    if (isAdmin.role !== client_1.UserRole.ADMIN) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You Are Unauthorized Admin", "");
    }
    // isExist Photoes
    const isExistPhoto = yield prisma_1.default.photos.findUniqueOrThrow({
        where: {
            id: photoId
        }
    });
    if (!isExistPhoto) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This Pets Not Exist in the Database", "");
    }
    // delete photoes
    const result = yield prisma_1.default.photos.delete({
        where: {
            id: photoId
        }
    });
    return result;
});
const getAllPetsFromDb = (params, option) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { limit, page, sortBy, sortOrder, skip } = (0, paginationHelper_1.default)(option);
    if (filterData.age) {
        filterData.age = Number(filterData.age);
    }
    const andCondition = [];
    //console.log(filterData);
    if (searchTerm) {
        andCondition.push({
            OR: [
                {
                    breed: {
                        contains: params.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    location: {
                        contains: params.searchTerm,
                        mode: "insensitive"
                    }
                },
                {
                    species: {
                        equals: params.searchTerm === client_1.Species.cat ? client_1.Species.cat : client_1.Species.dog
                    }
                },
                {
                    age: {
                        contains: params.searchTerm,
                        mode: "insensitive"
                    }
                }
            ]
        });
    }
    if (Object.values(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((field) => ({
                [field]: {
                    equals: filterData[field]
                }
            }))
        });
    }
    const whereCondition = { AND: andCondition };
    const result = yield prisma_1.default.pet.findMany({
        where: whereCondition,
        include: {
            photos: true
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        }
    });
    const total = yield prisma_1.default.pet.count({
        where: whereCondition
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const MyPetFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        where: {
            id
        },
        include: {
            adoptionRequests: {
                include: {
                    pet: {
                        include: {
                            photos: true,
                            adoptionRequests: true,
                            shelters: true
                        }
                    },
                }
            }
        }
    });
    return result;
});
exports.PetService = {
    createPetIntoDb,
    getAllSpecificPetIntoDb,
    updatePetIntoDb,
    deletePetsFromDb,
    deleteSpecificPhotosFromDb,
    getAllPetsFromDb,
    MyPetFromDb
};
