import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname:{
            type:String,
            required:true,
        },
        lastname:{
            type:String,
            required:true,
        },
        contact:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        orders:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Order", 
            }
        ],
        hasShippingAddress:{
            type:Boolean,
            default:false,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        isSeller: { 
            type: Boolean, 
            default: false 
        },
        ShippingAddress:{
            addressline1:{
                type:String,
            },
            addressline2:{
                type:String,
            },
            city:{
                type:String,
            },
            province:{
                type:String,
            },
            postalcode:{
                type:String,
            },
            country:{
                type:String,
            },
        },
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;