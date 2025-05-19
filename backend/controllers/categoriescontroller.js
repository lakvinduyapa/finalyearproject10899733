import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

//create category
export const createcategorycontroller = asyncHandler(async(req,res)=>{
    const {name}= req.body;
    //check if category already exists
    const categoryfound = await Category.findOne({name});
    if (categoryfound){
        throw new Error("Category already exists");
    }

    const category = await Category.create({
        name:name.toLowerCase(),
        seller:req.userAuthId,
        image:req.file.path,
    });

    res.json({
        status:"Success",
        message:"Category created successfully",
        category,
    });
});

//get all categories
export const getcategoriescontroller = asyncHandler(async(req,res)=>{
   const categories = await Category.find();

    res.json({
        status:"Success",
        message:"All Categories fetched successfully",
        categories,
    });
});

export const getcategorycontroller = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
 
     res.json({
         status:"Success",
         message:"Category fetched successfully",
         category,
     });
 });

//category update
 export const updatecategorycontroller = asyncHandler(async(req,res)=> {
     const{ 
         name, 
     } = req.body;
 
     const category = await Category.findByIdAndUpdate(req.params.id,{
         name, 
     },
 {
     new:true,
 });
     res.json({
         status: "success",
         message:"Category updated successfully",
         category,
     });
 });

 //category delete
 export const deletecategorycontroller = asyncHandler(async(req,res)=> {
    await Category.findByIdAndDelete(req.params.id);
     res.json({
         status: "success",
         message:"Category deleted successfully",
     });
 });