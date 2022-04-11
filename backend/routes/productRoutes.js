import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';


// @desc     Fetch all products
// @routes   GET /api/products
// @access   Public
router.get('/', asyncHandler(async (req, res) => {
  // {} gives us everything
  const products = await Product.find({})

  res.json(products)
}))


// @desc     Fetch single products
// @routes   GET /api/products/:id
// @access   Public
router.get('/:id', asyncHandler(async (req, res) => {
  // gives us whatever is in the id in the params
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }

}))

export default router