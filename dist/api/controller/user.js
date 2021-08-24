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
exports.reqister = void 0;
const user_service = require("../service/user");
const reqister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const regisetr = yield user_service.user_register(req.body);
    if (regisetr.status) {
        res.status(200).send({ ok: 'User Register Successfully' });
    }
    else {
        res.status(400).send({ error: `error-tyoe:${regisetr.err}` });
    }
});
exports.reqister = reqister;
