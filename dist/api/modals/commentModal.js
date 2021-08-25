"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    comment: {
        type: String,
        required: true
    }
});
const commentModal = mongoose.model('comment', commentSchema);
exports.default = commentModal;
