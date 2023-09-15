import { log } from 'console';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.fieldname == 'video') {
            cb(null, path.resolve('./storage/posts/videos'));
        }
        if (file.fieldname == 'images') {
            cb(null, path.resolve('./storage/posts/images'));
        } 
        
        if (file.fieldname.includes('test')) {
            cb(null, path.resolve('./storage/posts/test'));
        }

    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

export const uploadFilesPostMiddleware = multer({storage: storage});
