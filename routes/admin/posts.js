import express from "express";
import PostController from "../../app/http/controller/postController.js";
import { uploadFilesPostMiddleware } from "../../app/http/Middlewares/UploadFilesPostMiddleware.js";



// luu nhieu field => fields

const postRouter=(app)=>{
    const router=express.Router();
    const postController = new PostController();
    router.post(
        '',
        uploadFilesPostMiddleware.fields([
            {
                name: 'images',
            },
            {
                name: 'video',
                maxCount: 1
            },
        ]),
        
        postController.store
    );
    router.get('',postController.getAllPosts);
    router.get('/:postId', postController.show);
    router.put('/:postId', postController.update);
    router.delete('/:postId', postController.delete);

    app.use('/posts',router);
}
export default postRouter;