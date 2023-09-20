import express from "express";
import UserController from "../../app/http/controller/userController.js";
const customerRouter=(app)=>{
    const router=express.Router();
    const userController = new UserController();
    router.post('',userController.createUser)
    app.use('/customers',router);
}
export default customerRouter;