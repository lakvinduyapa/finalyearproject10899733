import User from "../models/User.js"
import bcrypt from "bcryptjs";
export const registerusercontroller = async(req, res) =>{
   const{ firstname, lastname, contact, email, password}=req.body;
  //check if user exist
  const userExists = await User.findOne({ email });
  if(userExists){
     res.json({
        message: "User already exists",
     });
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

}; 