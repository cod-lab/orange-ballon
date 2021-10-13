// import productModel from '../models/product.js';

async function common(req, res) {
    /*const response = await productModel.find().lean();
    res.status(200).json({
        user: (req.user ? req.user.group : req.userRole) || 'guest',
        products: response.length ? response : 'No product available!'
    });*/

    // const { originalUrl:url } = req;
    // console.log(res.locals);
    // const login = /^\/login$/;        // string can be '/login' only
    // if(login.test(url)) const token =
    // if()
    // res.status(200).render('index', { data: 'this is index view', token: res.locals.token });
    res.status(200).render('index', { user_group: req.user ? req.user.group : 'guest' });
}

export const getAdminHomeController = common;

export const getUserHomeController = common;

export const getGuestHomeController = common;

