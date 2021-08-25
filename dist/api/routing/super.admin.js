"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_routing_methods_1 = require("../common/common-routing-methods");
const super_admin_1 = require("../controller/super.admin");
//super admin routing
common_routing_methods_1.router.post('/admin', super_admin_1.add_admin_controller);
exports.default = common_routing_methods_1.router;
