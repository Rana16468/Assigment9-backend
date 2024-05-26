"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_routes_1 = require("../modules/user/User.routes");
const Auth_routes_1 = require("../modules/auth/Auth.routes");
const Pet_routes_1 = require("../modules/Pet/Pet.routes");
const Adoption_routes_1 = require("../modules/AdoptionRequest/Adoption.routes");
const Shelter_routes_1 = require("../modules/Shelter/Shelter.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: "/user", route: User_routes_1.UserRouter },
    { path: "/auth", route: Auth_routes_1.AuthRouter },
    { path: "/pats", route: Pet_routes_1.PetRouter },
    { path: "/adoption", route: Adoption_routes_1.AdoptionRequestRouter },
    { path: "/shelter", route: Shelter_routes_1.ShelterRouter }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
