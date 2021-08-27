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
exports.delete_comment_reply_controller = exports.delete_comment_controller = exports.add_comment_reply_controller = exports.add_comment_product_controller = exports.update_user_product_controller = exports.delete_user_product_controller = exports.show_all_product_controller = exports.show_single_product_controller = exports.show_user_product_controller = exports.add_product_controller = exports.login = void 0;
const user_service = require("../service/user"); //user modal
const global_1 = require("../common/global");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing login data into user service
    const login = yield user_service.user_login(req.body);
    if (login.status == 1) {
        let token = login.token;
        res.status(200).send({ ok: 'Login Successfully', token });
    }
    else {
        res.status(400).send({ error: `Login error :${login.err}` });
    }
});
exports.login = login;
//export regiseter controller 
const add_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing data in user service
    const product = yield user_service.add_product(req.body);
    if (product.status) {
        res.status(200).send({ ok: 'new product added' });
    }
    else {
        res.status(400).send({ error: `error-tyoe:${product.err}` });
    }
});
exports.add_product_controller = add_product_controller;
const show_user_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing login data into user service
    try {
        let user = global_1.global.user;
        let id = user._id;
        let response = yield user_service.show_user_product(id);
        if (response.status == 1) {
            res.status(200).send(response.product);
        }
        else {
            res.status(400).send({ error: `not found :${response.err}` });
        }
    }
    catch (err) {
        res.status(400).send({ error: 'No data found' });
    }
});
exports.show_user_product_controller = show_user_product_controller;
const show_single_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _id = req.params.id;
    let response = yield user_service.show_single_product(_id);
    let product = response.product;
    console.log(response);
    if (response.status == 1) {
        res.status(200).send(product);
    }
    else {
        res.status(400).send({ error: `no data found` });
    }
});
exports.show_single_product_controller = show_single_product_controller;
const show_all_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //passing login data into user service
    try {
        let user = global_1.global.user;
        let id = user._id;
        console.log(id);
        let response = yield user_service.show_all_product(id);
        if (response.status == 1) {
            res.status(200).send(response.product);
        }
        else {
            res.status(400).send({ error: `not found :${response.err}` });
        }
    }
    catch (err) {
        res.status(400).send({ error: 'No data found' });
    }
});
exports.show_all_product_controller = show_all_product_controller;
const delete_user_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _id = req.params.id;
        let user = global_1.global.user;
        let userId = user._id;
        const isDeleted = yield user_service.delete_user_product(_id, userId);
        // if(isDeleted.ok)
        if (isDeleted.deletedCount != 0) {
            res.status(200).send({ ok: 'Record Deleted..' });
        }
        else {
            res.status(400).send({ error: 'Record not found' });
        }
    }
    catch (_a) {
    }
});
exports.delete_user_product_controller = delete_user_product_controller;
const update_user_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _id = req.params.id;
        let user = global_1.global.user;
        let userId = user._id;
        let record = req.body;
        const isUpdated = yield user_service.update_user_product(_id, userId, record);
        if (isUpdated.nModified !== 0) {
            res.status(200).send({ ok: 'Record Updated..' });
        }
        else {
            res.status(400).send({ error: 'Record Not Updated' });
        }
    }
    catch (err) {
    }
});
exports.update_user_product_controller = update_user_product_controller;
const add_comment_product_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let comment = req.body.comment;
        let user = global_1.global.user;
        let userId = user._id;
        let productId = req.params.id;
        let response = yield user_service.add_comment(userId, productId, comment);
        if (response.status) {
            res.status(200).send({ ok: 'Thank you for Comment' });
        }
        else {
            res.status(400).send(response.error);
        }
    }
    catch (err) {
        res.status(400).send({ error: err });
    }
});
exports.add_comment_product_controller = add_comment_product_controller;
const add_comment_reply_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let commentId = req.params.commentId;
        let productId = req.params.productId;
        let reply = req.body;
        console.log(reply, commentId);
        let response = yield user_service.add_comment_reply(productId, commentId, reply);
        if (response.status == 1) {
            res.status(200).send({ ok: "thank you for reply" });
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.add_comment_reply_controller = add_comment_reply_controller;
const delete_comment_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let commentId = req.params.commentId;
        let user = global_1.global.user;
        let userId = user._id;
        const response = yield user_service.delete_comment(commentId, userId);
        if (response.status == 1) {
            res.status(200).send({ ok: 'Comment Deleted' });
        }
        else {
            res.status(400).send({ error: 'You can not delete this comment' });
        }
    }
    catch (err) {
    }
});
exports.delete_comment_controller = delete_comment_controller;
const delete_comment_reply_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let replyId = req.params.replyId;
        let user = global_1.global.user;
        let userId = user._id;
        const response = yield user_service.delete_comment_reply(replyId, userId);
        if (response.status == 1) {
            res.status(200).send({ ok: 'reply Deleted' });
        }
        else {
            res.status(400).send({ error: 'You can not delete this reply' });
        }
    }
    catch (err) {
    }
});
exports.delete_comment_reply_controller = delete_comment_reply_controller;
