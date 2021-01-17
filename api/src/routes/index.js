const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const reviewRouter = require('./review.js')
const userRouter = require ('./user.js');
const orderRouter = require ('./orders.js');
const cartRouter = require ('./cart.js');
const imageRouter = require('./image.js')
const checkRouter = require ('./checkout.js');
const contactRouter = require ('./contact.js');
const authRouter = require ('./auth.js')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter); 
router.use('/orders', orderRouter);
router.use('/cart', cartRouter);
router.use('/review', reviewRouter);
router.use('/image', imageRouter)
router.use('/checkout', checkRouter);
router.use('/contact', contactRouter);

module.exports = router;