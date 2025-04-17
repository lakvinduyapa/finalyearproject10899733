import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createordercontroller = asyncHandler (async(req, res) =>{
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
    totalPrice
   });
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
  res.json({
    msg:"Welcome orders controller",
  });
});