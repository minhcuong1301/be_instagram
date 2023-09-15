import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { TYPE_POST } from "../../config/constant.js";

const postSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            require:true,
        },
        type:{
            type:Number,
            enum: { 
                values: Object.values(TYPE_POST.type),
                message: 'Giá trị đã chọn trong trường phân quyền không hợp lệ.'
            }
        },
        created_by: {
            type: ObjectId, 
            required: false,
        },
        updated_by: {
            type: ObjectId,
            required: false,
        },
        created_at: {  
            type: Date,
            required: false,
            timestamps: true
        },
        updated_at: {  
            type: Date,
            required: false,
            timestamps: true
        },
        deleted_at: {  
            type: Date,
            required: false
        },
    },
    {
        timestamps: {// tu dong set du lieu cho hai truong do
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: {getters: true}
    }
);
postSchema.virtual(
    'images',
    {
        ref: 'Image',
        foreignField: 'post_id',
        localField: '_id'
    }
)
postSchema.virtual(
    'videos',
    {
        ref: 'Video',
        foreignField: 'post_id',
        localField: '_id'
    }
)
export default mongoose.model("Post", postSchema,"posts");