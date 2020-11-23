import * as mongoose from 'mongoose';

export const DriverServiceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  price: {
    type: Number,
    default: 0,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  serviceDate: {
    type: Date,
    default: Date.now,
  },
});
