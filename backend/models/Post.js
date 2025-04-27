import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema= new Schema(

{
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
      },
      user: {
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
      link: {
        type: String,
        required: true,
      },
      date:{
        type:Date,
        default:Date.now,
      },
},
{
    timestamps: true,
    toJSON: { virtuals: true},
}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;