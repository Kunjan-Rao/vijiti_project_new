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
exports.add_admin_controller = void 0;
const super_admin_service = require("../service/super.admin");
const add_admin_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let isAdded = yield super_admin_service.add_admin(req.body);
    if (isAdded.status == 1) {
        res.status(200).send({ ok: "Admin Regiseter" });
    }
    else {
        res.status(400).send({ error: `error-type ${isAdded.err}` });
    }
});
exports.add_admin_controller = add_admin_controller;
