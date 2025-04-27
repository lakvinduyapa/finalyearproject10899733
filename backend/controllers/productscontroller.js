import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createproductcontoller = asyncHandler (async (req,res) =>{
    console.log(req.files);
    const{ name, description, category, seller, price, totalQty} = req.body;
    const convertedImgs = req.files.map((file) => file?.path);
    //check if product exists
    const productExists = await Product.findOne({ name});
    if(productExists){
        throw new Error("Product Already Exists");
    }
    //find the category
    const categoryFound = await Category.findOne({
        name: category,
    });
    if(!categoryFound){
        throw new Error("Category not exist");
    }
    //creating the product
    const product = await Product.create({
        name,
        description,
        category,
        seller: req.userAuthId,
        price,
        totalQty,
        images: convertedImgs,
        });
    //send the product to the category
    categoryFound.products.push(product._id);

    await categoryFound.save();
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
const pagination = {};
if(endIndex < total){
    pagination.next = {
        page: page + 1,
        limit,
    };
}
if(startIndex > 0){
    pagination.prev = {
        page: page - 1,
        limit,
    };
}
  //query await
  const products = await productQuery.populate('reviews');

    res.json({
        status:"success",
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    });
});

//fetching single product
export const getsingleproductcontroller = asyncHandler(async(req,res)=> {
    const product = await Product.findById(req.params.id).populate('reviews');
    if(!product){
        throw new Error ("Product not found");
    }
    res.json({
        status: "success",
        message:"Product fetched successfully",
        product,
    });
});

//updating product
export const updateproductcontroller = asyncHandler(async(req,res)=> {
    const{ 
        name, 
        description, 
        category, 
        seller, 
        price, 
        totalQty,
    } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id,{
        name, 
        description, 
        category, 
        seller, 
        price, 
        totalQty, 
    },
{
    new:true,
});
    res.json({
        status: "success",
        message:"Product updated successfully",
        product,
    });
});

//deleting product

export const deleteproductcontroller = asyncHandler(async(req,res)=> {
   await Product.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message:"Product deleted successfully",
    });
});