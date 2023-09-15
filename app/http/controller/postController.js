import express, { request } from "express";
import { responseJsonByStatus, responseSuccess, responseErrors } from "../../common/helper.js";
import Post from "../../models/post.js";
import Image from "../../models/image.js";
import Video from "../../models/video.js";
class postController {
    async store(req, res) {
        const { caption, type, user_id } = req.body;
        const images = req.files.images;
        const video = req.files.video[0].filename;

        try {
            const newPost = new Post({
                user_id: user_id,
                caption: caption,
                type: type,
            });

            const savedPost = await newPost.save();
            const imagePromises = images.map(async (image) => {
                const newImage = new Image({
                    post_id: savedPost._id,
                    url: image.filename,
                });
                await newImage.save();
            });

            const newVideo = new Video({
                post_id: savedPost._id,
                url: video,
            });
            await newVideo.save();

            return responseJsonByStatus(res,
                responseSuccess(
                    {
                        caption: savedPost.caption,
                        type: savedPost.type,
                        userId: savedPost.user_id,
                        images: images.map((image) => image.filename),
                        video: video,
                    })
            );
        } catch (error) {
            return responseJsonByStatus(
                res,
                responseErrors(500, error.message)
            )
        }
    }
    async getAllPosts(req, res) {
        try {
            const posts = await Post.find().populate([
                'images',
                'videos'
            ]);
    
            return responseJsonByStatus(res,responseSuccess(posts)
            );
        }  catch (error) {
            return responseJsonByStatus(
                res,
                responseErrors(500, e.message)
            )
        }
    }
    async show(req, res) {
        const postId = req.params.postId;
        try {
            const post = await Post.findOne({ _id: postId }).populate([
                'images',
                'videos'
            ]);
            return responseJsonByStatus(res,responseSuccess(post)
            );
        }  catch (error) {
            return responseJsonByStatus(
                res,
                responseErrors(500, error.message)
            )
        }
    }
    async update(req,res){
        
    }

}

export default postController;