import * as mongoose from 'mongoose';

export const CarServiceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
        default: 1,
      },
    },
  ],
  serviceDate: {
    type: Date,
    default: Date.now,
  },
});
