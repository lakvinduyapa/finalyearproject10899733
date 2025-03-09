import { getTokenFromHeader } from "../utils/getTokenfromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req,res,next) =>{
    //getting token from header
    const token = getTokenFromHeader(req);
    //token verification
    const decodedUser= verifyToken(token);
    if(!decodedUser){
        throw new Error('invalid/expires token, please try again');
    }else{
    req.userAuthId = decodedUser?.id;
    next();
    }
};