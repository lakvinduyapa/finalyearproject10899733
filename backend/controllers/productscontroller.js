import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const createproductcontoller = asyncHandler (async (req,res) =>{
    const{ name, description, category, seller, price, totalQty} = req.body;
    //check if product exists
    const productExists = await Product.findOne({ name});
    if(productExists){
        throw new Error("Product Already Exists");
    }
    //creating the product
    const product = await Product.create({
        name,
        description,
        category,
        seller: req.userAuthId,
        price,
        totalQty,
        });
    //send the product to the category
    //send response
    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});

export const getproductcontroller = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json({
        status:"success",
        products,
    });
});