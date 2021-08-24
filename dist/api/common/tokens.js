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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genrateToken = void 0;
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const genrateToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = yield jwt.sign({ id }, process.env.JWT_KEY);
        return token;
    }
    catch (err) {
        return err;
    }
});
exports.genrateToken = genrateToken;
//this is for verify token is valid or not
const verifyToken = (isToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decode = yield jwt_decode(isToken);
        console.log(decode);
        return decode;
    }
    catch (err) {
        return err;
    }
});
exports.verifyToken = verifyToken;
