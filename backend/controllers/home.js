// import userModel from '../models/user.js';
// import productModel from '../models/product.js';

// import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
// import { generateErrUtility } from '../utils/errHandling/generateErr.js';

// export const validateUserController = tryCatchUtility(async (req, res) => {
//     const user = req.user;          // when performing other opts
//     if(typeof user !== 'undefined')
//         return user.group === 'admin' ? getAdminHomeController(req, res) : getUserHomeController(req, res);

//     const role = req.userRole;      // when loging in
//     if(typeof role !== 'undefined')
//         return role === 'admin' ? getAdminHomeController(req, res) : getUserHomeController(req, res);

//     getGuestHomeController(req, res);
// });

/*
export const getAdminHomeController = (req, res) => {
    // console.log(req);
    const role = req.user ? req.user.group : req.userRole;
    // res.send('yoo..its admin!\nrole',role);
    console.log('2.5 ->',role);
    res.send(`yoo..its admin!\nrole: ${role}`);

};

export const getUserHomeController = (req, res) => {
    const role = req.user ? req.user.group : req.userRole;
    console.log('3 ->',role);
    res.send(`yoo..its user!\nrole: ${role}`);

};

export const getGuestHomeController = (req, res) => {
    // const role = req.userRole;

    const role = req.userRole || 'guest';
    console.log('4 ->',role);
    res.send(`yoo..its guest!<br>role: ${role}`);
    // console.log('role',req.userRole);

};
*/

import productModel from '../models/product.js';

// import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
// import { generateErrUtility } from '../utils/errHandling/generateErr.js';

// const common = tryCatchUtility(async (req, res) => {
async function common(req, res) {
    // try {
        const response = await productModel.find().lean(); // .catch // .then(_, err => { console.log(err); });
        res.status(200).json({
            user: (req.user ? req.user.group : req.userRole) || 'guest',
            products: response.length ? response : 'No product available!'
        });
    // } catch (err) {
    //     console.log(err);
    //     // throw new generateErrUtility(err);
    // }
}

export const getAdminHomeController = common;

export const getUserHomeController = common;

export const getGuestHomeController = common;

