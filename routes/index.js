import authRouter from "./admin/auth.js";
import postRouter from "./admin/posts.js";
import userRouter from "./admin/users.js";
const routers=(app)=>{
    userRouter(app);
    authRouter(app);
    postRouter(app);

}

export default routers;