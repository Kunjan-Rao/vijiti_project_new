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
exports.user_delete = exports.admin_login = exports.show_all_user = exports.user_register = void 0;
const password_1 = require("../common/password");
const tokens_1 = require("../common/tokens");
const adminModal_1 = require("../modals/adminModal");
const userModal_1 = require("../modals/userModal");
const admin_login = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let admin = yield adminModal_1.default.findOne({ username });
        if (admin) {
            const isValid = yield password_1.verifyPassword(password, admin.password);
            if (isValid) {
                let token = yield tokens_1.genrateToken(admin._id);
                return { status: 1, token };
            }
        }
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.admin_login = admin_login;
const user_register = ({ name, email, mobileno, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //faching data from user controller 
        password = yield password_1.setPassword(password);
        const user = yield new userModal_1.default({ name, email, mobileno, password });
        yield tokens_1.genrateToken(user._id); //genrate token
        yield user.save(); //save data into the collection
        return { status: 1 };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.user_register = user_register;
const show_all_user = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModal_1.default.aggregate([
            {
                $match: {}
            },
            {
                $project: { password: 0 }
            }
        ]);
        return { status: 1, users };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.show_all_user = show_all_user;
const user_delete = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isDeleted = yield userModal_1.default.deleteOne({ _id });
        console.log(isDeleted);
        return isDeleted;
    }
    catch (err) {
        return err;
    }
});
exports.user_delete = user_delete;
