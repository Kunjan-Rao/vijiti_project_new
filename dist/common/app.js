"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const user_1 = require("../api/routing/user");
require("./config/db");
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use('/user', user_1.default);
app.listen(port, () => {
    console.log(`Server Runnig on ${port}`);
});
