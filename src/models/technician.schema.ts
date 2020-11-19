import * as mongoose from 'mongoose';

export const TechnicianSchema = new mongoose.Schema(
    {
    technician: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    availability: Boolean,
    },
)

mongoose.model('User', TechnicianSchema);