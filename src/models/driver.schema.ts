import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
    driverName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: Boolean,
})

mongoose.model('User', DriverSchema);