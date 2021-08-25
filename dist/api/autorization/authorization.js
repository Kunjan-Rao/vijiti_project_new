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
exports.superadmin = exports.admin = exports.user = void 0;
const userModal_1 = require("../modals/userModal");
const adminModal_1 = require("../modals/adminModal");
const tokens_1 = require("../common/tokens");
const global_1 = require("../common/global");
const user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barearToken = req.headers['authorization'];
        const token = barearToken.split(' ')[1];
        const isUser = yield tokens_1.verifyToken(token);
        if (isUser.id) {
            let _id = isUser.id;
            const user = yield userModal_1.default.findOne({ _id });
            global_1.global.user = user;
            next();
            return;
        }
        else {
            res.status(400).send({ error: 'make sure you are logged in' });
        }
    }
    catch (err) {
        res.status(400).send({ login_error: 'token not valid' });
    }
});
exports.user = user;
//admin authorization
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barearToken = req.headers['authorization'];
        const token = barearToken.split(' ')[1];
        const isAdmin = yield tokens_1.verifyToken(token);
        if (isAdmin.id) {
            let _id = isAdmin.id;
            const Admin = yield adminModal_1.default.findOne({ _id });
            if (Admin.role == 0) {
                next();
                return;
            }
        }
        else {
            res.status(400).send({ error: 'make sure you are admin' });
        }
    }
    catch (err) {
        res.status(400).send({ admin_error: 'token not valid' });
    }
});
exports.admin = admin;
//super admin authorization
const superadmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barearToken = req.headers['authorization'];
        const token = barearToken.split(' ')[1];
        const isAdmin = yield tokens_1.verifyToken(token);
        if (isAdmin.id) {
            let _id = isAdmin.id;
            const Admin = yield adminModal_1.default.findOne({ _id });
            if (Admin.role == 1) {
                next();
                return;
            }
        }
        else {
            res.status(400).send({ error: 'make sure you are super admin' });
        }
    }
    catch (err) {
        res.status(400).send({ admin_error: 'token not valid' });
    }
});
exports.superadmin = superadmin;
