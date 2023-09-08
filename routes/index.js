import authRouter from "./admin/auth.js";

import userRouter from "./admin/users.js";
const routers=(app)=>{
    userRouter(app);
    authRouter(app);

}

export default routers;