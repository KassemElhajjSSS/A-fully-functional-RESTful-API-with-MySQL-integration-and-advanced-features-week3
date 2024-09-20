const express = require('express')
const { getAllProducts, getProductById, createProduct, deleteProduct, updateProductPrice, getAllProductsSorted, getProductsByType } = require('../controllers/productController')
const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProductPrice)

module.exports = router