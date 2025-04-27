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

CouponSchema.pre('validate', function(next) {
    if (this.endDate < this.startDate) {
      return next(new Error("End date cannot be less than the start date"));
    }
  
    if (this.discount <= 0 || this.discount > 100) {
      return next(new Error("Discount must be between 1 and 100"));
    }
  
    if (this.startDate < Date.now()) {
      return next(new Error("Start date should be today or a future date"));
    }
  
    if (this.endDate < Date.now()) {
      return next(new Error("End date should be a future date"));
    }
  
    next();
  });
  
const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;