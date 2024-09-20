const {Product} = require('../../models/index')

const getAllProducts = async (req, res) => {
    try{
        let products = []
        let message = ''

        // localhost:3000/products?filterType=all&isSorted=true&page=1&pageSize=10    (this how the url should look like)
        const filterType = req.query.filterType || 'all'
        const isSorted = req.query.isSorted === 'true'
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;

        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        //Filtering
        if(filterType === 'all'){
            products = await Product.findAll({
                limit: limit,
                offset: offset,
            })
            message = 'getting all the products!'
        }
        else{
            products = await Product.findAll({
                where : {
                    type : filterType
                },
                limit: limit,
                offset: offset,
            })
            message = `getting the products of type ${filterType}`
        }

        const totalProducts = await Product.count();
        const totalPages = Math.ceil(totalProducts / pageSize)

        //Sorting
        if(isSorted){
            products = products.sort((a, b) => a.price - b.price)
            message += ' sorted'
        }

        res.json({status: 'ok', message: message, products: products, totalPages: totalPages})
    }catch(err){
        res.json({status: 'failed', message: err.message })
    }
}

const getProductById = async (req, res) => {
    try{
        const product = await Product.findByPk(parseInt(req.params.id))
        if(!product) 
            return res.json({status: 'failed', message: 'product not found!'})
        res.json({status: 'ok', message: `getting product with name ${product.name}`, product:product})
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const createProduct = (req, res) => {
    try{
        const {name, type, price} = req.body    
        Product.create({
            name,
            type,
            price
        })
        res.json({status: 'ok', message:`product is created with name ${name}, type ${type}, and price ${price} `})
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const deleteProduct = async (req, res) => {
    try{
        productId = parseInt(req.params.id)
        const product = await Product.findByPk(productId)
        if(!product) return res.json({status: 'failed', message: 'product not found!'})
        await Product.destroy({
            where:{
                id : parseInt(req.params.id)
            }
        })
        res.json({status: 'ok', message: `product of name ${product.name} has been deleted!`, product})
    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

const updateProductPrice = async (req, res) => {
    try{
        productId = parseInt(req.params.id)
        price = req.body.price
        const product = await Product.findByPk(productId)
        if(!product) return res.json({status: 'failed', message: 'product not found!'})
        await Product.update(
            {price},
            {where: {
                id : productId
            }}
        )
        res.json({status: 'ok', message: `product of name ${product.name} has been updated`})

    }catch(err){
        res.json({status: 'failed', message: err.message})
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProductPrice
}