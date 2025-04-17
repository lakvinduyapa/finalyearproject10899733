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
//virtuals
//total rating
ProductSchema.virtual('totalReviews').get(function(){
  const product = this;
  return product?.reviews?.length;
});
//average rating
ProductSchema.virtual('averageRating').get(function(){
  let totalratings = 0;
  const product = this
  product?.reviews?.forEach((review) => {
    totalratings += review?.rating;
  });
  const averageRating = Number(totalratings/ product?.reviews?.length).toFixed(1);
  return averageRating;
});
//total quantity left
ProductSchema.virtual('quantityleft').get(function(){
  const product = this;
  return product.totalQty - product.totalSold;
})
const Product = mongoose.model("Product", ProductSchema);

export default Product;