import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema= new Schema(

{
    name:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        ref: "Category",
        required: true,
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      images: [
        {
          type: String,
          required: true,
        },
    ],
    reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      price: {
        type: Number,
        required: true,
      },
      totalQty: {
        type: Number,
        required: true,
      },
      totalSold: {
        type: Number,
        required: true,
        default: 0,
      },
},
{
    timestamps: true,
    toJSON: { virtuals: true},
}
);
const Product = mongoose.model("Product", ProductSchema);

export default Product;