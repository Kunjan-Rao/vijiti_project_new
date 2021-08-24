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
exports.user_register = void 0;
const userModal_1 = require("../modals/userModal");
const user_register = ({ name, email, mobileno, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield new userModal_1.default({ name, email, mobileno, password });
        yield user.save();
        return { status: 1 };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.user_register = user_register;
