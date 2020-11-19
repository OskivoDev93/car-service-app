"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicianSchema = void 0;
const mongoose = require("mongoose");
exports.TechnicianSchema = new mongoose.Schema({
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: Boolean,
});
mongoose.model('User', exports.TechnicianSchema);
//# sourceMappingURL=technician.schema.js.map