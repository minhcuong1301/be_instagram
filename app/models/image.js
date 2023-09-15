import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { default as mongoosePaginate } from "mongoose-paginate";
const imagesSchema = new mongoose.Schema(
    {
        post_id: {
            type: ObjectId,
            required: true,
            ref: 'Post'
        },
        url: {
            type: String,
            require:true,
           
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
        deleted_at: {  //thoi gian xoa
            type: Date,
            required: false
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: {getters: true}
    }
);
imagesSchema.plugin(mongoosePaginate);
export default mongoose.model("Image", imagesSchema,"images");