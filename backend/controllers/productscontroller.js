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
    console.log(req.query);
    //query
    let productQuery = Product.find()
  
 //search by name
if (req.query.name){
    productQuery = productQuery.find({
        name:{ $regex: req.query.name, $options:"i" },
    });
}
//search by category
if (req.query.category){
    productQuery = productQuery.find({
        name:{ $regex: req.query.category, $options:"i" },
    });
}
//filter by price
if (req.query.price) {
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
        price: {$gte: priceRange[0], $lte: priceRange[1]},
    });
}
//pagination
const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await Product.countDocuments();

productQuery = productQuery.skip(startIndex).limit(limit);

  //query await
  const products = await productQuery;

    res.json({
        status:"success",
        products,
    });
});