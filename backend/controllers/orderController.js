const Order = require('../models/order');
const Product = require('../models/product');

exports.newOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    try{
    if (!order) {
        return res.status(400).json({ message: `Order not saved` })
    }
    res.status(200).json({
        success: true,
         order
    })
       }catch(e){
        res.status(400).json({ message: 'order error' })
    }
}

// exports.newOrder = async(res,req,next) => {
//     res.status(200).json({success:true})
// }

exports.myOrders = async (req, res, next) => {
     const orders = await Order.find({ user: req.user._id })
    try {
        if (!orders) {
            return res.status(404).json({ message: `Order found` })
        }
        res.status(200).json({
            success: true,
            orders
        })
    }catch(e){
        console.log(e)
        res.status(400).json({error:"my orders fetch error"})
    }
}

// exports.myOrders = async (req,res,next) => {
//     res.status(200).json({success:true})
// }

exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    try {
    if (!order) {
        return res.status(404).json({ message: `No Order found with this ID` })
    }
    res.status(200).json({
        success: true,
        order
    }) 
        }catch(e){
            res.status(400).json({error:"single order fetch error"})
        }
}

// exports.getSingleOrder = async (req,res,next) => {
//     res.status(200).json({success:true})
// }