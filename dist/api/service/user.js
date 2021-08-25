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
exports.add_comment = exports.show_single_product = exports.update_user_product = exports.delete_user_product = exports.show_all_product = exports.show_user_product = exports.user_login = exports.add_product = void 0;
const password_1 = require("../common/password");
const tokens_1 = require("../common/tokens");
const userModal_1 = require("../modals/userModal");
const productModal_1 = require("../modals/productModal");
const global_1 = require("../common/global");
const commentModal_1 = require("../modals/commentModal");
const mongoose = require("mongoose");
const user_login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield userModal_1.default.findOne({ email });
        if (user) {
            const isValid = yield password_1.verifyPassword(password, user.password);
            if (isValid) {
                let token = yield tokens_1.genrateToken(user._id);
                return { status: 1, token };
            }
        }
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.user_login = user_login;
const add_product = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { item, category, price } = product;
        let { _id } = global_1.global.user;
        let savedproduct = yield new productModal_1.default({
            item, category, price, userId: _id
        });
        yield savedproduct.save();
        return { status: 1 };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.add_product = add_product;
const show_user_product = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield productModal_1.default.find({ userId: _id });
        return { status: 1, product };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.show_user_product = show_user_product;
const show_single_product = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   let product=await productModal.find({_id})
        let _id = mongoose.Types.ObjectId(id);
        let product = yield productModal_1.default.aggregate([
            {
                $match: { _id: _id }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "ProductId",
                    as: "comment"
                }
            },
        ]);
        return { status: 1, product };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.show_single_product = show_single_product;
const show_all_product = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let product = yield productModal_1.default.aggregate([
            {
                $match: { $not: { userId: _id } },
            }
        ]);
        return { status: 1, product };
    }
    catch (err) {
        return { status: 0, err };
    }
});
exports.show_all_product = show_all_product;
const delete_user_product = (_id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let isDeleted = yield productModal_1.default.deleteOne({ $and: [{ userId, _id }] });
    return isDeleted;
});
exports.delete_user_product = delete_user_product;
const update_user_product = (_id, userId, record) => __awaiter(void 0, void 0, void 0, function* () {
    let isUpdated = yield productModal_1.default.updateOne({ userId, _id }, record);
    return isUpdated;
});
exports.update_user_product = update_user_product;
const add_comment = (userId, productId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    let newComment = new commentModal_1.default({
        userId,
        ProductId: productId,
        comment
    });
    yield newComment.save();
    return { newComment, status: 1 };
});
exports.add_comment = add_comment;
