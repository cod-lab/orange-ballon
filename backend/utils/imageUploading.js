import multer from 'multer';
import path from 'path';

import { generateErrUtility } from './errHandling/generateErr.js';

// const fileFilter = (req, file, cb) => {
const fileFilter = (req, { mimetype }, cb) => {
    // const { mimetype } = file;
    // if(mimetype === 'image/jpeg' || mimetype === 'image/jpg' || mimetype === 'image/png' || mimetype === 'image/bmp')
    const validImg = /^image\/(jpg|jpeg|png|bmp|ico)$/;
    if(validImg.test(mimetype)) return cb(null, true);
    cb(new generateErrUtility('Allowed only JPG, JPEG, PNG, BMP, ICO formats!',422), false);
};

// const limits = {
//     fileSize: 1024 * 512,   // 512kb
// };

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    destination: ({ url }, file, cb) => {
        // cb(null, url === '/addproduct' ? './images/products' : './images/reviews');
        // console.log(url);
        const validUrl = /^\/(add|update)product(\/[a-z0-9]{24})*$/;
        // cb(null, url === '/addproduct' ? './backend/images/products' : './backend/images/reviews');
        cb(null, validUrl.test(url) ? './backend/images/products' : './backend/images/reviews');
    },
    filename: (req, { originalname }, cb) => {
        // const { name, ext } = path.parse(file.originalname);
        const { name, ext } = path.parse(originalname);
        const chars = { ':': '-',  'T': '_T' };
        const newName = name
            .replace(/\s/g, '-') + '_' + new Date().toISOString()
            .replace(/[:T]/g, m => chars[m]) + ext;

        cb(null, newName);
    }
});

export const uploadConfig = multer({
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 512 },   // 512kb
    storage: storage
});

