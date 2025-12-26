import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    takerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
    giverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
    clotheId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clothe",
    required: true
  },
  status :
  {
    type : String , default : 'Pending' , enum: ["Pending", "Confirm", "Received"],
  }
},{
    timestamps: true
  }
)

const Order = mongoose.model('order', orderSchema)
export default Order ;