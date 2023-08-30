import express from "express";
import authMiddleware from "../../app/http/Middlewares/AuthMiddleware.js";
import { updateProfileMiddleware } from "../../app/http/Middlewares/updateProfileMiddleware.js";
import ProfileController from "../../app/http/controller/profileController.js";
import { validateChangePassword } from "../../app/http/Request/UserRequest.js";
const profileRouter=(app)=>{
    const router=express.Router();
    const profileController = new ProfileController();
    app.use(authMiddleware);
    router.get('', profileController.show)
    router.put('',updateProfileMiddleware.single('avatar'), profileController.update);
    router.put('/change-password', validateChangePassword ,profileController.changePassword);
    app.use('/profile',router);
}
export default profileRouter;