import express from 'express';

import { getProductsApi, getProductApi, getProductRatingApi, getProductReviewsApi, getDocumentationApi } from '../controllers/api.js';

const router = express.Router();

router
    // view all products as guest
    .get('/products',getProductsApi)

    // view any particular product as guest
    .get('/:pcode([a-z0-9_-]{6,15})',getProductApi)

    // get product consolidated rating
    .get('/productrating/:pid',getProductRatingApi)

    // get product reviews
    .get('/productreviews/:pid',getProductReviewsApi)

    // get access to dir 'images'
    .use('/images',express.static('backend/images'))
    // eg. http://localhost:5000/images/products/product1.jpg

    // get each api's document
    .get('/docs',getDocumentationApi);

export default router;

