"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//common modules
const common_routing_methods_1 = require("../common/common-routing-methods");
const admin_1 = require("../controller/admin");
const authorization_1 = require("../autorization/authorization");
//admin routig
common_routing_methods_1.router.post('/login', admin_1.admin_login_controller);
common_routing_methods_1.router.post('/register', authorization_1.admin, admin_1.reqister);
common_routing_methods_1.router.get('/user', authorization_1.admin, admin_1.show_all_user_controller);
common_routing_methods_1.router.post('/user/delete/:id', authorization_1.admin, admin_1.delete_user_controller);
exports.default = common_routing_methods_1.router;
