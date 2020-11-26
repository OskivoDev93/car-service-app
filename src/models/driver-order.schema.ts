import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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
    type: String,
  },
});
DriverServiceSchema.index({ createdAt: 1 }, { expires: '12h' });