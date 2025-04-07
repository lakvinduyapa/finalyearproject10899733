import mongoose from "mongoose";
const Schema = mongoose.Schema;

    const ReviewSchema= new Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true, "Review should belong to a User"],
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:[true,"Review should belong to a user"],
        },
        reviewmsg:{
            type:String,
            required:[true, "Please add a message"],
        },
        rating:{
            type:Number,
            required:[true, "Please add a rating between 1 and 5"],
            min: 1,
            max: 5,
        },
    },
    {
        timestamps:true,
    }
);
const Review=mongoose.model("Review", ReviewSchema);

export default Review;