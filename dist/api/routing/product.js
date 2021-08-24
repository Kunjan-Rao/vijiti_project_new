"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//common modules
const common_routing_methods_1 = require("../common/common-routing-methods");
//products routing
common_routing_methods_1.router.get('/product', (req, res) => {
    res.send('hello from admin side');
});
exports.default = common_routing_methods_1.router;
