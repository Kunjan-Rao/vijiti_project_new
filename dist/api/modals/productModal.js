"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    issuDate: {
        type: Date,
        default: new Date().getDate(),
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
});
const productModal = mongoose.model('Product', productSchema);
exports.default = productModal;
