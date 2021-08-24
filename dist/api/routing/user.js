"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../controller/user");
const router = express.Router();
//user routing
router.get('/', (req, res) => {
    res.send('hello from user side');
});
router.post('/register', user_1.reqister);
exports.default = router;
