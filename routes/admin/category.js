import express from 'express';
import CategoryController from '../../app/http/controller/categoryController.js';
import authMiddleware from '../../app/http/Middlewares/AuthMiddleware.js';
import { validateStoreOrUpdateCategory } from '../../app/http/Request/categoryRequest.js';
const categoryRouter=(app)=>{
    const router=express.Router();
    const categoryController = new CategoryController();
    router.use(authMiddleware);
    router.post('', validateStoreOrUpdateCategory, categoryController.store);
    router.put('/:categoryId', categoryController.update);                                                                                                                                      
    router.post('/:categoryId', categoryController.show);
    router.delete('/:categoryId', categoryController.detroy);
    router.get('' ,categoryController.index);
    app.use('/categories', router);
}
export default categoryRouter;