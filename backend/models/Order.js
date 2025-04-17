import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate Random Numbers for order id
const randomtext = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomnumbers = Math.floor(1000 + Math.random() * 90000);
const OrderSchema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
orderItems:[{
    type:Object,
    required:true,
},
],
shippingAddress:{
    type:Object,
    required:true,
},
orderNumber:{
    type:String,
    default: randomtext + randomnumbers,
},

//for stripe payment
paymentStatus:{
    type:String,
    default:"Not Paid",
},
paymentMethod:{
    type:String,
    default:"Not Specified",
},
totalPrice:{
    type:Number,
    default:0.0,
},
//for admin purpose
status:{
    type:String,
    default:"pending",
    enum: ["pending", "processing", "shipped", "delivered"],
},
deliveredAt:{
    type:Date,
},
},
{
    timestamps:true,
}
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;