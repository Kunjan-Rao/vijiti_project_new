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
exports.verifyPassword = exports.setPassword = void 0;
const bcrypt = require("bcryptjs");
//this is for hashing a password
const setPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashPassword = yield bcrypt.hash(password, 10);
        return hashPassword;
    }
    catch (err) {
        return err;
    }
});
exports.setPassword = setPassword;
//this is for compare password 
const verifyPassword = (password, server_password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isValid = yield bcrypt.compare(password, server_password);
        return isValid;
    }
    catch (err) {
        return err;
    }
});
exports.verifyPassword = verifyPassword;
