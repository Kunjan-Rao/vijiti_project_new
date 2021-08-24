"use strict";
//common modules
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../controller/user");
const authorization_1 = require("../autorization/authorization");
const router = express.Router();
//user routing
router.post('/login', user_1.login);
router.post('/product', authorization_1.user, user_1.add_product_controller);
router.get('/product', authorization_1.user, user_1.show_user_product_controller);
router.get('/all-product', authorization_1.user, user_1.show_all_product_controller);
router.delete('/delete/:id', authorization_1.user, user_1.delete_user_product_controller);
router.put('/update/:id', authorization_1.user, user_1.update_user_product_controller);
exports.default = router;
