// model: mô hinhf hoas CacheStorage
// định nghia cac funtion handeler of api
import User from "../../models/user.js";
import {generateJWTToken, hashHmacString, 
    responseSuccess, responseErrors, 
    responseJsonByStatus} from "../../common/helper.js";
import UserService from "../../services/UserService.js";

class AuthController {
    static userService = new UserService();
    async login(req, res) {
        const {phone, password} = req.body;
        
        const user = await AuthController.userService.findByPhone(phone);
     
        if (!user) {
            return responseJsonByStatus(
                res, 
                responseErrors(401,'User khong ton tai'),
                401
            );
        }

        if (user.password !== hashHmacString(password)) {
            return responseJsonByStatus(
                res, 
                responseErrors(401,'Pass khong chinh xac'),
                401
            );
        }
        
        if(user.level===2){
            return responseJsonByStatus(
                res, 
                responseErrors(401,'Bạn không có quyền đăng nhập vào fe admin'),
                401
            );
        }

        return responseJsonByStatus(
            res,
            responseSuccess(
                {
                    user_token: generateJWTToken(user.id)
                }
            ),
        )
    }
    async loginCustomer(req, res) {
        const {phone, password} = req.body;
        // console.log(user.password,hashHmacString(password));
        const user = await AuthController.userService.findByPhone(phone);
        console.log(user);
        console.log(user.password,hashHmacString(password));
     
        if (!user) {
            return responseJsonByStatus(
                res, 
                responseErrors(401,'User khong ton tai'),
                401
            );
        }

        if (hashHmacString(user.password) !== hashHmacString(password)) {
            return responseJsonByStatus(
                res, 
                responseErrors(401,'Pass khong chinh xac'),
                401
            );
        }
      

        return responseJsonByStatus(
            res,
            responseSuccess(
                {
                    user_token: generateJWTToken(user.id)
                }
            ),
        )
    }

    async logout(req, res){

    }
}

export default AuthController;