"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const user_1 = require("../api/routing/user");
const admin_1 = require("../api/routing/admin");
const super_admin_1 = require("../api/routing/super.admin");
require("./config/db");
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', user_1.default);
app.use('/admin', admin_1.default);
app.use('/super-admin', super_admin_1.default);
app.listen(port, () => {
    console.log(`Server Runnig on ${port}`);
});
