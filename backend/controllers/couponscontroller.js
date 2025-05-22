import Coupon from "../models/Coupon.js";
import asyncHandler from "express-async-handler";

export const createcouponcontroller = asyncHandler(async(req,res) =>{
   

    const{code,startDate,endDate,discount} = req.body;
   //check if admin
   //check if coupon exists
   const couponExists = await Coupon.findOne({
    code,
   });

   if(couponExists){
    throw new Error("Coupon Already Exists");
   }

   if(isNaN(discount)){
    throw new Error("Discount value must be a number");
   }

   //create coupon
   const coupon = await Coupon.create({
    code: code?.toUpperCase(),
    startDate,
    endDate,
    discount,
    user:req.userAuthId,
   });

   res.status(201).json({
    status:"success",
    message:"Coupon Created Successfully",
    coupon,
   });
});

export const getallcouponscontroller = asyncHandler(async(req,res) =>{
    const coupons = await Coupon.find();
    res.status(200).json({
        status:"success",
        message:"All Coupons",
        coupons,
    });
});


export const getsinglecouponcontroller = asyncHandler(async(req,res)=> {
    const coupon = await Coupon.findById(req.params.id);
    if(!coupon){
        throw new Error ("Coupon not found");
    }
    res.json({
        status: "success",
        message:"Coupon fetched successfully",
        coupon,
    });
});

//updating coupon
export const updatecouponcontroller = asyncHandler(async(req,res)=> {
    const{
        code,
        startDate,
        endDate,
        discount} = req.body;

    const coupon = await Coupon.findByIdAndUpdate(req.params.id,{
        code:code?.toUpperCase(),
        startDate,
        endDate,
        discount
    },
{
    new:true,
});
    res.json({
        status: "success",
        message:"Coupon updated successfully",
        coupon,
    });
});

//deleting coupon

export const deletecouponcontroller = asyncHandler(async(req,res)=> {
   await Coupon.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message:"Coupon deleted successfully",
    });
});

export const validateCouponByCode = asyncHandler(async (req, res) => {
  const { code } = req.query;

  const coupon = await Coupon.findOne({ code: code?.toUpperCase() });
  if (!coupon) throw new Error("Invalid coupon code");
  if (coupon.isExpired) throw new Error("This coupon has expired");

  res.json({
    status: "success",
    message: "Valid coupon",
    coupon,
  });
});
