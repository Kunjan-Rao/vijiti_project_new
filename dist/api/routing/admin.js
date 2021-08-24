"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//common modules
const common_routing_methods_1 = require("../common/common-routing-methods");
const admin_1 = require("../controller/admin");
//admin routig
common_routing_methods_1.router.get('/product', (req, res) => {
    res.send('hello from admin side');
});
common_routing_methods_1.router.post('/register', admin_1.reqister);
exports.default = common_routing_methods_1.router;
