"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShelterRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const Shelter_validation_1 = require("./Shelter.validation");
const Shelter_controller_1 = require("./Shelter.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(Shelter_validation_1.ShelterValidationSchema.ShelterSchema), Shelter_controller_1.ShelterController.CreateShelter);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), Shelter_controller_1.ShelterController.GetAllShelter);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), Shelter_controller_1.ShelterController.GetSpecificShelter);
router.patch("/:shelterId", (0, auth_1.default)(client_1.UserRole.ADMIN), Shelter_controller_1.ShelterController.UpdateShelter);
router.delete("/:shelterId", (0, auth_1.default)(client_1.UserRole.ADMIN), Shelter_controller_1.ShelterController.DeleteShelter);
exports.ShelterRouter = router;
