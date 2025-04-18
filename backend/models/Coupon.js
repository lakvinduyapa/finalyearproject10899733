import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code:{
        type:String,
        required:true,
    },

    startDate:{
        type:Date,
        required:true,
    },

    endDate:{
        type:Date,
        required:true,
    },

    discount:{
        type:Number,
        required:true,
        default:0,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},
{
    timestamps: true,
    toJSON:{
        virtuals:true
    },
});

//coupon expire check
CouponSchema.virtual('isExpired').get(function(){
    return this.endDate< Date.now();
});

CouponSchema.virtual('daysLeft').get(function(){
   const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 *60 * 24)) + " " + "Days left";
   return daysLeft;
});

CouponSchema.pre('validate', function(next){
    if(this.endDate < this.startDate){
        next(new Error("End date cannot be less than the start date"));
    }
    next();
});

CouponSchema.pre('validate', function(next){
    if(this.discount<=0 || this.discount>100){
        next(new Error("Discount cannot be zero of more than 100"));
    }
});

CouponSchema.pre('validate', function(next){
    if(this.startDate < Date.now()){
        next(new Error("Start date should be a present or a future date"));
    }
    next();
});

CouponSchema.pre('validate', function(next){
    if(this.endDate < Date.now()){
        next(new Error("End date should be a future date"));
    }
    next();
});
const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;