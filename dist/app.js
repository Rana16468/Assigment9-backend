"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const golobalErrorHnadelar_1 = __importDefault(require("./app/middleware/golobalErrorHnadelar"));
const notFounded_1 = __importDefault(require("./app/middleware/notFounded"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "https://pat-adoption-orpin.vercel.app", credentials: true }));
//https://www.npmjs.com/package/cookie-parser
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send({ message: "Assigment 9 Server is Running" });
});
//username : assigmentnine
//password:uuvfpaD8lRlF8UWX
//this Application databse link : https://supabase.com/dashboard/project/ssgjhknjgnqsvqvrrdkx/editor/29158
app.use('/api/v1', routes_1.default);
app.use(golobalErrorHnadelar_1.default);
app.use("*", notFounded_1.default);
exports.default = app;
