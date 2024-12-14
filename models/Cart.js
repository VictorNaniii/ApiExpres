import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
)

export default CartSchema
