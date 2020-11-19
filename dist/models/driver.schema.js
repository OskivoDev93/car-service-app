"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverSchema = void 0;
const mongoose = require("mongoose");
exports.DriverSchema = new mongoose.Schema({
    driverName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: Boolean,
});
mongoose.model('User', exports.DriverSchema);
//# sourceMappingURL=driver.schema.js.map