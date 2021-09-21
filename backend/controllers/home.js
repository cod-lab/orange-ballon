import productModel from '../models/product.js';

async function common(req, res) {
    const response = await productModel.find().lean();
    res.status(200).json({
        user: (req.user ? req.user.group : req.userRole) || 'guest',
        products: response.length ? response : 'No product available!'
    });
}

export const getAdminHomeController = common;

export const getUserHomeController = common;

export const getGuestHomeController = common;

