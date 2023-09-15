import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { default as mongoosePaginate } from "mongoose-paginate";
const videosSchema = new mongoose.Schema(
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
            type: ObjectId, //ai tao ra document
            required: false,
        },
        updated_by: {
            type: ObjectId,
            required: false,
        },
        created_at: {  //thoi gian tao
            type: Date,
            required: false,
            timestamps: true
        },
        updated_at: {   //thoi gia update cuoi cung
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
        timestamps: {// tu dong set du lieu cho hai truong do
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: {getters: true}
    }
);
videosSchema.plugin(mongoosePaginate);
export default mongoose.model("Video", videosSchema,"videos");