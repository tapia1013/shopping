import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @desc     Fetch all products
// @routes   GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  // {} gives us everything
  const products = await Product.find({})

  res.json(products)
})


// @desc     Fetch single products
// @routes   GET /api/products/:id
// @access   Public
const getProductById = asyncHandler(async (req, res) => {
  // gives us whatever is in the id in the params
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})


export {
  getProductById,
  getProducts
}