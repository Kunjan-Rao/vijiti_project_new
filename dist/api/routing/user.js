"use strict";
//common modules
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController = require("../controller/user");
const authorization_1 = require("../autorization/authorization");
const router = express.Router();
//user routing
router.post('/login', userController.login);
router.post('/product', authorization_1.user, userController.add_product_controller);
router.get('/product', authorization_1.user, userController.show_user_product_controller);
router.get('/product/:id', authorization_1.user, userController.show_single_product_controller);
router.post('/product/comment/:id', authorization_1.user, userController.add_comment_product_controller);
router.get('/products', authorization_1.user, userController.show_all_product_controller);
router.delete('/delete/:id', authorization_1.user, userController.delete_user_product_controller);
router.put('/update/:id', authorization_1.user, userController.update_user_product_controller);
router.post('/product/comment/:productId/:commentId', authorization_1.user, userController.add_comment_reply_controller);
router.delete('/product/comment/delete/:commentId', authorization_1.user, userController.delete_comment_controller);
router.delete('/product/comment/reply/delete/:replyId', authorization_1.user, userController.delete_comment_reply_controller);
exports.default = router;
