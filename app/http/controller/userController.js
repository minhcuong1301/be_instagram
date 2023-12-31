import express, { request } from "express";
import { hashHmacString, responseJsonByStatus, responseSuccess, responseErrors } from "../../common/helper.js";
import User from "../../models/user.js";
import UserService from "../../services/UserService.js";
import { level } from "winston";

class userController{
    static userService = new UserService();
    async store(req, res) {
 
        try {
            return responseJsonByStatus(
                res,
                responseSuccess(
                    await userController.userService.store(
                        req.body,
                        res.locals.authUser._id
                    )
                )
            )
        } catch (e) {
            return responseJsonByStatus(
                res,
                responseErrors(500, e.message)
            )
        }
    }

    async update(req, res) {
        try{
            const { userId } = req.params;
            const data = { ...req.body };
            console.log(data);
            const userUpdated = await userController.userService.update(data, userId, res.locals.authUser._id)
            console.log(userUpdated);
            return responseJsonByStatus(
                res,
                responseSuccess(userUpdated)
            )
        } catch(e){
            return responseJsonByStatus(
                res,
                responseErrors(400, "update khong thanh cong")
            )
        }
    }
    async show(req, res){
        try{
            const userId=req.params;
            const user= await userController.userService.findById(userId.userId);
            console.log(user);
            if(!user){
                return responseJsonByStatus(
                    res,
                    responseErrors(400,'khong tim thay user can show')
                )
            }
            
            return responseJsonByStatus(
                res,
                responseSuccess(user)
            )
        } catch(e){
            return responseJsonByStatus(
                res,
                responseErrors(500, e.message)
            )
        }
    }
    async index (req, res){
        try{
            const {limit=10, page=1, keyword, level}=req.query;
            const users= await userController.userService.getListWithPaginate(
                limit, 
                page, 
                {
                    level,
                    keyword
                }
            );
            return responseJsonByStatus(
                res,
                responseSuccess(users)
            )
        } catch(e){
            return responseJsonByStatus(
                res,
                responseErrors(500, e.message),
                500
            )
        }

    }
    async destroy(req,res){
    
        userController.userService.destroy(req.params.userId)
      .then(
        () => responseJsonByStatus(res, responseSuccess(true))
      ).catch(
        e => responseJsonByStatus(res, responseErrors(500, e.message), 500)
      );
    // try{
    //     const userId = req.body;
    //     console.log(userId);
    //     if(await userController.userService.findById(userId)===null){
    //         return responseJsonByStatus(
    //             res,
    //             responseErrors(400,'khong tim thay user can xoa')
    //         )
    //     }
    //     const userDeleted = await userController.userService.destroy(userId)

    //     if(userDeleted.deletedCount===0){
    //         return responseJsonByStatus(
    //             res,
    //             responseErrors(400,'xoa User that bai')
    //         )
    //     }

    //     return responseJsonByStatus(
    //         res,
    //         responseSuccess(200, 'Xoa user thanh cong')
    //     )
    // } catch(e){
    //     return responseJsonByStatus(
    //         res,
    //         responseErrors(500, e.message)
    //     )
    // }

    }
    async createUser(req,res){
    try{
        const { phone, name, password } = req.body;
        const user = new User({ phone, name, password });
        await user.save();
        return responseJsonByStatus(
            res,
            responseSuccess(user)
        )
    }
    catch(e){
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng ký tài khoản.' });
    }
        
    }
}

export default userController;