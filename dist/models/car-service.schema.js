"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServiceSchema = void 0;
const mongoose = require("mongoose");
exports.CarServiceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        default: 0,
    },
    technicians: [
        {
            technician: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            quantity: {
                type: Number,
                default: 0,
            }
        }
    ],
    serviceDate: {
        type: Date,
        default: Date.now,
    }
});
//# sourceMappingURL=car-service.schema.js.map