import express from "express";
import AuthController from "../../app/http/controller/authController.js";
const authRouter=(app)=>{
    const router=express.Router();
    const authController = new AuthController();
    router.post('/login', authController.login);
    router.post('/loginCustomer', authController.loginCustomer);

    app.use('/auth',router);
}
export default authRouter;