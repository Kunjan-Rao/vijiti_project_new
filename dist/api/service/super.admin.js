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
exports.add_admin = void 0;
const password_1 = require("../common/password");
const tokens_1 = require("../common/tokens");
const adminModal_1 = require("../modals/adminModal");
const add_admin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = user;
        password = yield password_1.setPassword(password);
        let admin = new adminModal_1.default({
            username, password, role: 0
        });
        yield tokens_1.genrateToken(admin._id);
        yield admin.save();
        return { status: 1 };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.add_admin = add_admin;
