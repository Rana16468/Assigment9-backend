"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Adoption_validation_1 = require("./Adoption.validation");
const Adoption_controller_1 = require("./Adoption.controller");
const router = express_1.default.Router();
//Node :  Adoption Request Table Router at all.
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(Adoption_validation_1.AdoptionRequestValidation.createAdoptionRequestValidation), Adoption_controller_1.AdoptionRequestController.CreateAdoptionRequest);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), Adoption_controller_1.AdoptionRequestController.getAllAdoptionRequest);
router.put("/:requestId", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Adoption_validation_1.AdoptionRequestValidation.updateAdoptionRequestValidation), Adoption_controller_1.AdoptionRequestController.updateAdoptionRequest);
router.delete("/:requestId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), Adoption_controller_1.AdoptionRequestController.deleteAdoptionRequest);
exports.AdoptionRequestRouter = router;
