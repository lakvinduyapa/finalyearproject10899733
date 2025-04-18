import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import Stripe from "stripe";
import dbConnect from '../config/dbConnect.js';
import userRoutes from "../route/usersRoute.js";
import productRoutes from "../route/productsRoute.js";
import categoryRoutes from "../route/categoriesRoute.js";
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import reviewRoutes from "../route/reviewRoute.js";
import orderRoutes from "../route/ordersRoute.js";
import Order from "../models/Order.js";
import couponRoutes from "../route/couponsRoute.js";


//database connection
dbConnect();

const app =express();

//stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

const endpointSecret = 'whsec_d3147254389ea8be0401a2a64e507671b54e7c831768d73d85cf3c0a79e1fe1e';

app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
      console.log("event");
    } catch (err) {
      console.log('err',err.message);
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  if(event.type === "checkout.session.completed"){
    //update order
    const session= event.data.object;
    const{orderId} =session.metadata;
    const paymentStatus= session.payment_status;
    const paymentMethod= session.payment_method_types[0];
    const totalAmount=session.amount_total;
    //find the order
    const order= await Order.findByIdAndUpdate(JSON.parse(orderId),{
      totalPrice: totalAmount / 100,
      paymentMethod,
      paymentStatus,
    },
  {
    new:true
  });
  console.log(order);
  }else{
    return;
  }
  // // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntent = event.data.object;
  //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  //     // Then define and call a method to handle the successful payment intent.
  //     // handlePaymentIntentSucceeded(paymentIntent);
  //     break;
  //   case 'payment_method.attached':
  //     const paymentMethod = event.data.object;
  //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //     // handlePaymentMethodAttached(paymentMethod);
  //     break;
  //   default:
  //     // Unexpected event type
  //     console.log(`Unhandled event type ${event.type}.`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json());
//routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/coupons", couponRoutes);

//error handling middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;