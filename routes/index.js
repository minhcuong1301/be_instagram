import authRouter from "./admin/auth.js";
import postRouter from "./admin/posts.js";
import userRouter from "./admin/users.js";
import customerRouter from "./user/register.js";
const routers=(app)=>{
    userRouter(app);
    authRouter(app);
    postRouter(app);
    customerRouter(app);

}

export default routers;