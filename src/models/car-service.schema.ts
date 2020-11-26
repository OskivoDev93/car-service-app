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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ], 
  serviceDate:{
    type: String,
  },
});
CarServiceSchema.index({ createdAt: 1 }, { expires: '24h' });
