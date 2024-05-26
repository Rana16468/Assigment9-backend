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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHealpers_1 = require("../../helper/jwtHealpers");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../utility/sendEmail");
const client_1 = require("@prisma/client");
// Node : Login Into Database Service Method
const LoginIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is Incorred", "");
    }
    const accessToken = jwtHealpers_1.jwtHalpers.generateToken({ email: userData.email, id: userData.id, role: userData.role }, config_1.default.jwt_aceess_secret, config_1.default.jwt_expires_in);
    const refreshToken = jwtHealpers_1.jwtHalpers.generateToken({ email: userData.email, id: userData.id, role: userData.role }, config_1.default.jwt_refeesh_srcret, config_1.default.refresh_token_expire_in);
    const data = {
        accessToken,
        needPasswordChange: userData.needPasswordChange,
        refreshToken
    };
    return data;
});
const changePasswordIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This User is Not Exist", "");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.currentpassword, userData.password);
    if (!isCorrectPassword) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password Encorred", "");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newpassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    });
    return result;
});
const confirmationEmail = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email
        },
        select: {
            email: true,
            id: true,
            role: true
        }
    });
    let generateVarificationToken;
    if (userData === null || userData === void 0 ? void 0 : userData.id) {
        generateVarificationToken = { chnagePasswordToken: {
                email: userData.email, id: userData.id, role: userData.role
            },
            generateLink: config_1.default.chnage_password_link
        };
    }
    else {
        generateVarificationToken = { registerToken: {
                email: payload.email
            },
            generateLink: config_1.default.varification_password_link
        };
    }
    const resetPasswordToken = jwtHealpers_1.jwtHalpers.generateToken(generateVarificationToken.chnagePasswordToken, config_1.default.varification_token_srcret, config_1.default.varification_expire_in);
    // console.log(resetPasswordToken);
    const resetPasswordLink = generateVarificationToken.generateLink + `?id=${userData === null || userData === void 0 ? void 0 : userData.id}&token=${resetPasswordToken}`;
    yield (0, sendEmail_1.sendEmail)(userData === null || userData === void 0 ? void 0 : userData.email, `
     <div>
     <p> Dear User</p>
     <p>Your Password Reset Link</p>
     <a href=${resetPasswordLink}>
      <button>Varification</button>
     </a>
     </div>`);
    return "Checked Your Email And Varified";
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHealpers_1.jwtHalpers.varifyToken(token, config_1.default.jwt_refeesh_srcret);
    }
    catch (error) {
        throw new Error("You Are Not Authorization");
    }
    const isUserExit = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: decodedData.id,
        }
    });
    const accessToken = jwtHealpers_1.jwtHalpers.generateToken({ email: isUserExit.email, id: isUserExit.id, role: isUserExit.role }, config_1.default.jwt_aceess_secret, config_1.default.jwt_expires_in);
    return {
        accessToken,
        needPasswordChange: isUserExit.needPasswordChange
    };
});
exports.AuthService = {
    LoginIntoDb,
    changePasswordIntoDb,
    confirmationEmail,
    refreshToken
};
