"use strict";
//common modules
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../controller/user");
const router = express.Router();
//user routing
router.post('/login', user_1.login);
router.post('/register', user_1.reqister);
exports.default = router;
