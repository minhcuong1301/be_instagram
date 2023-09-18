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
        const postId = req.params.postId;
        const { caption, type } = req.body;
        const images = req.files;
    
        try {
            const post = await Post.findOne({ _id: postId }).populate([
                'images',
                'videos'
            ]);
    
            if (!post) {
                return responseJsonByStatus(res, responseErrors(404, "Không tìm thấy bài viết"));
            }
    
            // Cập nhật các trường của bài viết
            post.caption = caption;
            post.type = type;
    
            // Cập nhật hình ảnh nếu cần
            if (images && images.length > 0) {
                const newImages = images.map((image) => ({
                    post_id: postId,
                    url: image.filename,
                }));
    
                // Xóa các hình ảnh cũ và thêm các hình ảnh mới
                await Image.deleteMany({ post_id: postId });
                await Image.insertMany(newImages);
            }
    
            // Lưu bài viết đã được cập nhật
            await post.save();
    
            return responseJsonByStatus(res, responseSuccess(post));
        } catch (error) {
            return responseJsonByStatus(res, responseErrors(500, error.message));
        }
    }
    async delete(req, res) {
        const postId = req.params.postId;
    
        try {
            const post = await Post.findById(postId);

            if (!post) {
                return responseJsonByStatus(res, responseErrors(404, "Không tìm thấy bài viết"));
            }
            await Post.deleteOne({ _id: postId });
    
            return responseJsonByStatus(res, responseSuccess("Bài viết đã được xóa thành công"));
        } catch (error) {
            return responseJsonByStatus(res, responseErrors(500, error.message));
        }
    }

}

export default postController;