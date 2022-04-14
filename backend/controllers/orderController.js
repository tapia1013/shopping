import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc     Create a new order
// @routes   POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalPrice,
    taxPrice,
    shippingPrice
  } = req.body

  // console.log(req.body);

  // Make sure its not empty
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    // create a new order in DATABASE
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice,
      taxPrice,
      shippingPrice
    })

    // save to DB
    const createdOrder = await order.save();
    // (201) something was created and pass in saved createdOrder
    res.status(201).json(createdOrder)
  }

})







// @desc     Get order by ID
// @routes   GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  // check if order exists
  if (order) {
    res.json(order)
  } else {
    req.status(404)
    throw new Error('Order not found')
  }

})




export { addOrderItems, getOrderById }