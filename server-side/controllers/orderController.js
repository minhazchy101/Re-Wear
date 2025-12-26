import Order from "../models/Order.js"
import User from "../models/user.js"

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
    const orders = await Order.find({ giverId: req.takerId })
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
