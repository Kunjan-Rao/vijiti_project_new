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
exports.delete_user_controller = exports.admin_login_controller = exports.show_all_user_controller = exports.reqister = void 0;
const admin_service = require("../service/admin");
//export regiseter controller 
const reqister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing data in user service
    const regisetr = yield admin_service.user_register(req.body);
    if (regisetr.status) {
        res.status(200).send({ ok: 'User Register Successfully' });
    }
    else {
        res.status(400).send({ error: `error-type:${regisetr.err}` });
    }
});
exports.reqister = reqister;
const show_all_user_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield admin_service.show_all_user();
    res.send();
});
exports.show_all_user_controller = show_all_user_controller;
const admin_login_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_service.admin_login(req.body);
    if (admin.status == 1) {
        let token = admin.token;
        res.status(200).send({ ok: 'admin login successfully', token });
    }
    else {
        res.status(400).send({ error: 'inccorrect admin details' });
    }
});
exports.admin_login_controller = admin_login_controller;
const delete_user_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _id = req.params.id;
    const isDel = yield admin_service.user_delete(_id);
    if (isDel.deletedCount != 0) {
        res.status(200).send({ ok: 'User Deleted' });
    }
    else {
        res.status(400).send({ error: 'no data found' });
    }
});
exports.delete_user_controller = delete_user_controller;
