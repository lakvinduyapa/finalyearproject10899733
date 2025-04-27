import User from "../models/User.js";
const isSeller = async (req, res, next)=>{
    //find the logged in user

    const user = await User.findById(req.userAuthId);
    //check if seller
    if(user.isSeller){
        next()
    }else{
        next(new Error("Access Denied, Seller Only"));
    }
};

export default isSeller;