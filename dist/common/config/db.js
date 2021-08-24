"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const url = process.env.URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connection done to db');
}).catch(() => {
    console.log('Something went to wrong with your connection');
});
