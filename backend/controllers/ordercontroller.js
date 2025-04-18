import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createordercontroller = asyncHandler (async(req, res) =>{
   //get the coupon
   const {coupon} = req.query;
   
    const couponFound = await Coupon.findOne({
      code:coupon?.toUpperCase(),
    });
    if(couponFound?.isExpired){
      throw new Error ("Coupon has expired");
    }
    if(!couponFound){
      throw new Error ("Coupon doesn't exist");
    }

   //apply discount
   const discount = couponFound?.discount / 100;

  //get user payload
  const{orderItems, shippingAddress, totalPrice} = req.body;
    //find user
   const user = await User.findById(req.userAuthId);
   //shipping address check
   if(!user?.hasShippingAddress){
    throw new Error("Please Enter a Shipping Address");
   }
   //check if order is empty
   if(orderItems?.length<=0){
    throw new Error('No order items')
   }
   //Place the order and save to database
   const order = await Order.create({
    user:user?._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
   });
   console.log(order);
   //update the product quantity and total quantity sold
    const products= await Product.find({ _id:{$in:orderItems}});

    orderItems?.map(async(order)=> {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });
        if(product){
            product.totalSold += order.qty;
        }
        await product.save()
    });
   //push order into user
   user.orders.push(order?._id);
   await user.save();

   //stripe payment integration
const orderproducts = await Product.find({ _id: { $in: orderItems.map(item => item._id) } });

const line_items = orderItems.map((item) => {
  const product = orderproducts.find(p => p._id.toString() === item._id.toString());
  if (!product) {
    throw new Error(`Product with ID ${item._id} not found`);
  }

  return {
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        description: product.description || "No description",
      },
      unit_amount: Math.round(product.price * 100), // amount in cents
    },
    quantity: item.qty,
  };
});

const session = await stripe.checkout.sessions.create({
  line_items: line_items,
  metadata:{
    orderId: JSON.stringify(order?._id),
  },
  mode: "payment",
  success_url: "http://localhost:4000/success",
  cancel_url: "http://localhost:4000/cancel",
});

res.send({ url: session.url });

   //payment webhook
   //update the user order
//    res.json({
//     success:true,
//     message:"Order created successfully",
//     order,
//     user,
//    });
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
})