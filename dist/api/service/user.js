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
exports.delete_comment_reply = exports.delete_comment = exports.add_comment_reply = exports.add_comment = exports.show_single_product = exports.update_user_product = exports.delete_user_product = exports.show_all_product = exports.show_user_product = exports.user_login = exports.add_product = void 0;
const password_1 = require("../common/password");
const tokens_1 = require("../common/tokens");
const userModal_1 = require("../modals/userModal");
const productModal_1 = require("../modals/productModal");
const global_1 = require("../common/global");
const commentModal_1 = require("../modals/commentModal");
const mongoose = require("mongoose");
const replymodal_1 = require("../modals/replymodal");
const user_login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email);
        let user = yield userModal_1.default.findOne({ email });
        if (user) {
            const isValid = yield password_1.verifyPassword(password, user.password);
            if (isValid) {
                let token = yield tokens_1.genrateToken(user._id);
                return { status: 1, token };
            }
            else {
                return { status: 0 };
            }
        }
        return { status: 0, err: 'User no found' };
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
        console.log(_id);
        let product = yield productModal_1.default.aggregate([
            {
                $match: { _id }
            },
            { $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'ProductId',
                    as: 'comment'
                }
            },
            { $unwind: { path: '$comment', preserveNullAndEmptyArrays: true } },
            { $lookup: {
                    from: 'users',
                    localField: 'comment.userId',
                    foreignField: '_id',
                    as: 'comment.user'
                }
            },
            { $unwind: { path: '$comment.user', preserveNullAndEmptyArrays: true } },
            { $lookup: {
                    from: 'replies',
                    localField: 'comment._id',
                    foreignField: 'commentId',
                    as: 'comment.reply'
                }
            },
            { $project: {
                    'comment.ProductId': 0,
                    'comment.userId': 0,
                    'comment.__v': 0,
                    'comment.user._id': 0,
                    'comment.user.password': 0,
                    'comment.user.mobileno': 0,
                    'comment.user.email': 0,
                    'comment.user.__v': 0,
                    'comment.reply.productId': 0,
                    'comment.reply.commentId': 0,
                }
            },
            { $group: {
                    _id: "$_id",
                    item: { $first: "$item" },
                    category: { $first: "$category" },
                    price: { $first: "$price" },
                    comment: { $push: "$comment" },
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
        let userId = mongoose.Types.ObjectId(_id);
        let product = yield productModal_1.default.aggregate([
            {
                $match: { userId: { $nin: [userId] } },
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
const add_comment = (userid, productId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = mongoose.Types.ObjectId(userid);
    let ProductId = mongoose.Types.ObjectId(productId);
    let isProductUser = yield productModal_1.default.aggregate([
        {
            $match: { _id: ProductId, userId }
        },
        {
            $project: { userId: 1 }
        }
    ]);
    if (isProductUser.length != 0) {
        return { status: 0, error: 'you can not comment on own product' };
    }
    let newComment = new commentModal_1.default({
        userId,
        ProductId,
        comment
    });
    yield newComment.save();
    return { newComment, status: 1 };
});
exports.add_comment = add_comment;
const add_comment_reply = (productId, commentId, msg) => __awaiter(void 0, void 0, void 0, function* () {
    let cid = mongoose.Types.ObjectId(commentId);
    let pid = mongoose.Types.ObjectId(productId);
    let { reply } = msg;
    let newReply = new replymodal_1.default({
        productId: pid,
        commentId: cid,
        reply
    });
    yield newReply.save();
    return { status: 1 };
});
exports.add_comment_reply = add_comment_reply;
const delete_comment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let cid = mongoose.Types.ObjectId(commentId);
    let uid = mongoose.Types.ObjectId(userId);
    let isDeleted = yield commentModal_1.default.deleteOne({ $and: [{ userId: uid, _id: cid }] });
    if (isDeleted.deletedCount != 0) {
        return { status: 1 };
    }
    else {
        return { Status: 0 };
    }
});
exports.delete_comment = delete_comment;
const delete_comment_reply = (replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let rid = mongoose.Types.ObjectId(replyId);
    let uid = mongoose.Types.ObjectId(userId);
    console.log(rid, uid);
    let isDeleted = yield replymodal_1.default.deleteOne({ $and: [{ userId: uid, _id: rid }] });
    if (isDeleted.deleteCount != 0) {
        return { status: 1 };
    }
    else {
        return { status: 0 };
    }
});
exports.delete_comment_reply = delete_comment_reply;
