import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createordercontroller = asyncHandler(async (req, res) => {
  const { coupon } = req.query;
  let discount = 0;

  if (coupon) {
    const couponFound = await Coupon.findOne({ code: coupon.toUpperCase() });
    if (!couponFound) {
      throw new Error("Coupon doesn't exist");
    }
    if (couponFound.isExpired) {
      throw new Error("Coupon has expired");
    }
    discount = couponFound.discount / 100;
  }

  const { orderItems, shippingAddress, totalPrice } = req.body;
  const user = await User.findById(req.userAuthId);

  if (!user?.hasShippingAddress) {
    throw new Error("Please Enter a Shipping Address");
  }

  if (orderItems?.length <= 0) {
    throw new Error('No order items');
  }

  // Fetch product details
  const products = await Product.find({ _id: { $in: orderItems.map(item => item._id) } });

  // Build enhanced orderItems with seller
  const enhancedOrderItems = orderItems.map((item) => {
    const product = products.find(p => p._id.toString() === item._id.toString());
    if (!product) {
      throw new Error(`Product not found: ${item._id}`);
    }

    return {
      name: product.name,
      qty: item.qty,
      price: product.price,
      product: product._id,
      seller: product.seller, 
    };
  });

  // Create the order
  const order = await Order.create({
    user: user?._id,     
    orderItems: enhancedOrderItems,
    shippingAddress,
    totalPrice: totalPrice - totalPrice * discount,
  });

  console.log(order);

  // Update totalSold for each product
  await Promise.all(orderItems.map(async (item) => {
    const product = products.find(p => p._id.toString() === item._id.toString());
    if (product) {
      product.totalSold += item.qty;
      await product.save();
    }
  }));

  // Push order into user orders
  user.orders.push(order?._id);
  await user.save();

  // Stripe payment integration
  const line_items = enhancedOrderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description || "No description",
        },
        unit_amount: Math.round(item.price * (1 - discount) * 100),
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:4000/cancel",
  });

  res.send({ url: session.url });
});


export const getallorderscontroller = asyncHandler(async(req,res) =>{

  const orders = await Order.find();
  res.json({
    success:true,
    message:"All Orders fetched",
    orders,
  });
});

export const getsingleordercontroller = asyncHandler(async(req,res) =>{
  const id = req.params.id;
  const order = await Order.findById(id);
  res.status(200).json({
    success:true,
    message:"Order fetched",
    order,
  });
});

export const updateordercontroller = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const updatedorder = await Order.findByIdAndUpdate(id,{
    status:req.body.status,
  },{
    new:true,
  });
  res.status(200).json({
    success:true,
    message:"Order updated",
    updatedorder,
  });
});

export const getStripeSuccessOrderController = asyncHandler(async (req, res) => {
  const sessionId = req.params.sessionId;

  // Retrieve session from Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const orderId = JSON.parse(session.metadata.orderId);

  // Fetch the actual order
  const order = await Order.findById(orderId).populate("orderItems.product");

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json({
    success: true,
    order,
  });
});


export const getorderstatscontroller = asyncHandler(async(req,res) =>{

//total sales, min order, max order and average sale value
const orderstats = await Order.aggregate([{
  "$group":{
    _id:null,
    minimumSale:{
      $min: '$totalPrice',
    },
    maximumSale:{
      $max: '$totalPrice',
    },
    totalSales:{
      $sum: '$totalPrice',
    },
    averageSale:{
      $avg: '$totalPrice',
    },
  },
},]);

//get the date
const date = new Date();
const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
const saleToday = await Order.aggregate([
  {
    $match:{
      createdAt:{
        $gte: today,
      },
    },
  },
  {
    $group:{
      _id: null,
      totalSales:{
        $sum:"$totalPrice",
      },
    },
  },
]);

res.status(200).json({
  success:true,
  message:"Sum of Orders",
  orderstats, saleToday
});
});

export const getSellerOrdersController = asyncHandler(async (req, res) => {
  const sellerId = req.userAuthId; 

  const orders = await Order.find({
    "orderItems.seller": sellerId,
  }).populate("user", "name email") // populate customer info
    .populate("orderItems.product", "name price"); 

  res.status(200).json({
    success: true,
    message: "Seller's orders fetched successfully",
    totalOrders:orders.length,
    orders,
  });
});
