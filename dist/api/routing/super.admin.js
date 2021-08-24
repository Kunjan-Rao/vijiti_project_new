"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//commmon modules
const common_routing_methods_1 = require("../common/common-routing-methods");
//super admin routing
common_routing_methods_1.router.get('/admin', (req, res) => {
    res.send('hello from admin side');
});
exports.default = common_routing_methods_1.router;
