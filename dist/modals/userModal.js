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
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
});
UserSchema.methods.genrateToken = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { _id } = this;
            let token = yield jwt.sign(`${new Date().getDate}_${_id}`, process.env.JWT_KEY);
            let data = this;
            if (this.isModified('email')) {
                data['token'] = token;
                yield data.save();
            }
            return token;
        }
        catch (err) {
            console.log(`somethig went to wrong ${err}`);
        }
    });
};
let usermodal = mongoose.model('User', UserSchema);
exports.default = usermodal;
