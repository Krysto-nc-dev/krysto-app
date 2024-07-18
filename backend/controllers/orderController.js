import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Aucune commande trouvée.')
    return
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Get logged in user orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.status(200).json(orders)
})

// @desc Get order by id
// @route GET /api/order/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id).populate(
    'user',
    'name email',
  )
  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Commande non trouvée.')
  }
})

// @desc Update order to paid
// @route PUT /api/order/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid')
})

// @desc Update order to delivered
// @route PUT /api/order/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered')
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
  res.status(200).json(orders)
})

export {
  getOrders,
  getOrderById,
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
}
