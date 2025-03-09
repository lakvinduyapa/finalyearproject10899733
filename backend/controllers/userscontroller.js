import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtToken.js";
import { getTokenFromHeader } from "../utils/getTokenfromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerusercontroller = asyncHandler(async(req, res) =>{
   const{ firstname, lastname, contact, email, password}=req.body;
  //check if user exist
  const userExists = await User.findOne({ email });
  if(userExists){
    
     throw new Error ("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create user
  const user = await User.create({
     firstname, 
     lastname, 
     contact, 
     email, 
     password: hashedPassword,
  });
  res.status(201).json({
     status:'success',
     message: "User Registered Successfully",
     data:user,
  })

}); 

export const loginusercontroller = asyncHandler(async (req,res) => {
   const {email, password} = req.body;
   //finding user in db
   const userFound = await User.findOne({
      email,
   });
   if(userFound && await bcrypt.compare(password, userFound?.password)){
      res.json({
         status:'success',
         message:'User login successfull',
         userFound,
         token: generateToken(userFound?._id),
      });
   }else{
     throw new Error('Invalid User Credentials');
   }
});

export const getUserProfilecontroller = asyncHandler(async (req,res) =>{
   const token =getTokenFromHeader(req);
   const verified = verifyToken(token);
   console.log(req);
  res.json({
   msg:"Welcome to the Profile",
  });  
});