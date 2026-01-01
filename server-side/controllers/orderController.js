import Clothe from "../models/Clothes.js";
import Order from "../models/Order.js"
import User from "../models/user.js"
import mongoose from "mongoose";


export const addOrder = async (req, res)=>{
    try {
        const {id , giverId} = req.body ;
        const takerId = req.takerId
        const taker = await User.findOne({_id : takerId})
        const giver = await User.findOne({_id : giverId})
        const order = await Order.create({
            clotheId : id,
            takerId,
            giverId,
        })
    const index = taker.selectItems.indexOf(id); 
if (index !== -1) {
  taker.selectItems.splice(index, 1);
}

    taker.orderItems.push(order._id)
    await taker.save()

    giver.workItems.push(order._id)
    await giver.save()
       res.send({success: true, message: "Order Confirmed", order}) 
    } catch (error) {
      console.log('order error => ',error.message)  
    }
}

export const removeSelect = async (req, res) => {
  console.log(req.params)
  try {
    const takerId = req.takerId;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Item ID is required." });
    }

    const taker = await User.findById(takerId);
    if (!taker) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const index = taker.selectItems.indexOf(id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "This item is not available in your selection." });
    }
    console.log(index)
    taker.selectItems.splice(index, 1);
    await taker.save();
    const selectItems = taker.selectItems ;
    res.json({ success: true, message: "Item removed from selection.", selectItems });
  } catch (error) {
    console.log("Remove Select error =>", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ takerId: req.takerId })
      .populate([{
    path: "clotheId",
    options: { sort: { createdAt: -1 } }
  },{
    path: "takerId",
    options: { sort: { createdAt: -1 } }
  },]);

    res.send({ success: true, orders });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};

export const getMyOrdersRequest = async (req, res) => {
  try {
    const orders = await Order.find({ giverId: req.giverId })
      .populate([{
    path: "clotheId",
    options: { sort: { createdAt: -1 } }
  },{
    path: "takerId",
    select: "name email contact location",
    options: { sort: { createdAt: -1 } }
  },]);

    res.send({ success: true, orders });
  } catch (err) {
    res.status(500).send({ success: false });
  }
};





export const confirmOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

 
    const order = await Order.findById(id).session(session);
    if (!order) {
      await session.abortTransaction();
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

   
    order.status = "Confirmed";
    await order.save({ session });

  
    await Clothe.findByIdAndUpdate(
      order.clotheId,
      { status: "Purchased" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.send({
      success: true,
      message: "Order confirmed and product marked as purchased",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("confirmOrder =>", error.message);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};


export const declineOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.send({
      success: true,
      message: "Order declined and removed successfully",
    });
  } catch (error) {
    console.error("declineOrder =>", error.message);
    res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};
export const deleteOrderHistory = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Order history deleted",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};



