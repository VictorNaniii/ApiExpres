import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: [
      (producId = {
        type: String,
      }),
      (quantity = {
        type: Number,
        default: 1,
      }),
    ],
    amount: { type: Number, required: true },
    adress: { type: Object, rquired: true },
    status: { type: String, default: 'pending' },
  },
  {
    timestamps: true,
  }
)

export default OrderSchema
