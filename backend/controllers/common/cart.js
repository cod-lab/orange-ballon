import cartModel from '../../models/cart.js';
import productCustomizationModel from '../../models/productCustomization.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getCartProductsController = tryCatchUtility(async (req, res) => {
    const cart_ids = await cartModel.find({ user_id: req.user.userid }, { product_id: 1 }).lean();
    if(!cart_ids.length) return res.send('Empty Cart!');
    // console.log('cart_ids',cart_ids);

    let cartProducts = [];
    let idCount = cart_ids.length;
    for(let id of cart_ids) {
        // const response = await productCustomizationModel.find({ id: id._id }).lean();
        const response = await productCustomizationModel.aggregate(
        [
            { $match: { id: String(id._id) } },
            { $addFields: { product_id: id.product_id } },
            // { $project: { _id: 1, quantity: 1, size: 1, color: 1, id: 1, createdAt: 1, updatedAt: 1, product_id: 1 } }
        ]
        /*[
            {
              '$match': {
                'id': cart_ids[0]._id
              }
            }, {
              '$addFields': {
                'product_id': cart_ids[0].product_id
              }
            }
          ]*/
        );
        // console.log('\nid',id,'\nresponse',response);
        // console.log(typeof id,id._id,typeof id._id,id.product_id,typeof id.product_id);
        // console.log(String(id._id),typeof String(id._id));

        // if(response.length) cartProducts.push(...response);  // its outdated and has overflow problem with large array of around 100,000 items
        if(response.length) cartProducts = cartProducts.concat(response);
        else idCount--;
        /*response.forEach(customization => {
                // console.log('array\n',response);
                customization.product_id = id.product_id;
                // console.log('x',x);
                cartProducts.push(customization);
                // console.log(cartProducts[cartProducts.length-1].product_id);
                // console.log(cartProducts[cartProducts.length-1]);
                // console.log('x',x,'\ncart',cartProducts,'\nid',id);
            }); // else {
                // console.log('non array');
                // console.log('response',response,'\ncart',cartProducts,'\nid',id);
        else nullCount++;*/
        // console.log('id',id,'\nresponse',response);
    }
    // console.log(cartProducts[0].hasOwnProperty('product_id'));
    // console.log(cartProducts[cartProducts.length-1].product_id);
    // console.log('cart',cartProducts);
        // console.log('new id',id);

    // console.log('null',nullCount,'\ncart_ids.length',cart_ids.length);
    // if(nullCount === cart_ids.length) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    if(!idCount) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(200).json({ cartProducts: cartProducts });
    // res.sendStatus(200);
});

export const addProductToCartController = tryCatchUtility(async (req, res) => {
    /*const cartProduct = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    const response = await cartModel.create(cartProduct);
    if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Product added to cart!',
        cartProduct: response
    });*/

    let { body, params, user } = req;
    let response;

    // checking if ids already exist in cart model
    const existingIds = await cartModel.findOne({ user_id: user.userid, product_id: params.pid }, { _id: 1 }).lean();
    // if(existingIds) throw new generateErrUtility('These Ids combination already exists!',409);
    if(!existingIds) {
    // else {
        // adding ids to cart model
        const ids = {
            user_id: user.userid,
            product_id: params.pid
        };
        response = await cartModel.create(ids);
        if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);
    } else response = existingIds;

    // checking if product customization already exists in product customization model
    // body.id = response._id;
    // console.log(body);
    const existingProductCustomization = await productCustomizationModel.findOne({ id: response._id, quantity: body.quantity, size: body.size, color: body.color }, { _id: 1 }).lean();
    // let existingProductCustomization = await productCustomizationModel.count({ id: response._id, quantity: body.quantity, size: body.size, color: body.color }).lean();     // it will check all the docs and count the doc with satisfied query, so cant use this, bcz it is less efficient than findOne
    // let existingProductCustomization = await productCustomizationModel.findOne(body).lean();
    // console.log(existingProductCustomization);
    // if(existingProductCustomization) throw new generateErrUtility('This product customization already added to cart!',409);
    if(existingProductCustomization) return res.send('Product customization already added to cart!');
    // else {
        // adding product customization to product customization model
        // delete body.product_id;
        body.id = response._id;
        response = null;
        response = await productCustomizationModel.create(body); // || null;
        if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);
    // }

    res.status(201).json({
        msg: 'Product added to cart!',
        cartProduct: response
    }); // */res.sendStatus(200);
});

export const editCartProductController = tryCatchUtility(async (req, res) => {
    // const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { body:updates, params } = req;

    const response = await productCustomizationModel.findByIdAndUpdate(params.pcid, updates, { new: true }).lean();
    // console.log('response', response);
    if(!response) throw new generateErrUtility('Unable to edit product!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'Product edited!',
        editedProduct: response
    });
});

export const deleteCartProductController = tryCatchUtility(async (req, res) => {
    // const response = await productCustomizationModel.deleteOne({ _id: req.params.pcid }).lean();
    // if(!response.deletedCount) throw new generateErrUtility('Unable to remove product!\nPlease try again later...',404);

    let response = await productCustomizationModel.findByIdAndDelete(req.params.pcid).lean();
    if(!response) throw new generateErrUtility('Unable to remove product!\nPlease try again later...',404);

    const moreCustomization = await productCustomizationModel.findOne({ id: response.id }).lean();
    if(!moreCustomization) {
        // const y = await cartModel.findByIdAndDelete(response.id).lean();
        const { deletedCount } = await cartModel.deleteOne({ _id: response.id }).lean();
        if(!deletedCount) throw new generateErrUtility('Unable to remove ids doc from cart model!\nPlease try again later...',500);
    }

    res.status(200).send('Product removed!');
});

