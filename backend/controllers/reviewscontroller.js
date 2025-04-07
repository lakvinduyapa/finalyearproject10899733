import asynchandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";


export const createreviewcontroller = asynchandler(async(req,res)=>{
    const{product, reviewmsg, rating} = req.body;
   //finding product id
   const{ productid } = req.params;
   const productfound = await Product.findById(productid).populate('reviews');
   if(!productfound) {
    throw new Error("Product not found");
   }
   //check if user reviewed product
   const hasReviewed = productfound?.reviews?.find((review)=>{
    return review?.user?.toString()  === req?.userAuthId.toString();
   });
   if(hasReviewed){
    throw new Error("You have reviewed this product already");
   }
   //create a review
   const review = await Review.create({
    user: req.userAuthId,
    reviewmsg,
    rating,
    product: productfound?._id,
   });
   productfound.reviews.push(review?._id)
   await productfound.save();
   res.status(201).json({
    success: true,
    message: "Review placed successfully",
});
});