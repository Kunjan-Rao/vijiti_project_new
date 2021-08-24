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
exports.admin = exports.user = void 0;
const userModal_1 = require("../modals/userModal");
const tokens_1 = require("../common/tokens");
const user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const barearToken = req.headers['authorization'];
        console.log(barearToken);
        const token = barearToken.split(' ')[1];
        const isUser = yield tokens_1.verifyToken(token);
        if (isUser.id) {
            let _id = isUser.id;
            const user = yield userModal_1.default.findOne({ _id });
            next();
            return;
        }
        else {
            res.status(400).send({ error: 'login error' });
        }
    }
    catch (err) {
        res.status(400).send({ login_error: 'token not valid' });
    }
});
exports.user = user;
const admin = () => {
};
exports.admin = admin;
