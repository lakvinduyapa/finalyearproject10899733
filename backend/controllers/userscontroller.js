import User from "../models/User.js"

export const registerusercontroller = async(req, res) =>{
   const{ firstname, lastname, contact, email, password}=req.body;
  //check if user exist
  const userExists = await User.findOne({ email });
  if(userExists){
     res.json({
        message: 'User already exists',
     });
  }

  //create user
  const user = await User.create({
     firstname, 
     lastname, 
     contact, 
     email, 
     password
  });
  res.status(201).json({
     status:'success',
     message: 'User Registered Successfully',
     data:user,
  })

}; 