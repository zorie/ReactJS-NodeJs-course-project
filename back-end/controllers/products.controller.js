const indicative = require('indicative/validator')
const Product = require('../models/product.model').model
// const ProductMethods = require('../models/product.model').methods

module.exports = {
    index: (req, res) => {
        Product.find((error, results) => {
            if (error) {
                res.json({
                    success: false,
                })
            }

            res.json({
                success: true,
                allProducts: results,
            })
        })
    },

    create: (req, res) => {
        indicative
            .validate(req.body, {
                name: 'required|string|max:255',
                brand: 'required|string',
                description: 'required|string',
                type: 'required|string'
            })
            .then(async () => {
                const product = new Product()
                product.name = req.body.name
                product.brand = req.body.brand
                product.description = req.body.description
                product.type = req.body.type

                if (req.body.photoLink) {
                    product.photoLink = req.body.photoLink
                }

                await product.save()

                res.json({
                    success: true,
                    message: 'Product successfully created',
                    product,
                })
            })
            .catch((err) => {
                res.send(err)
            })
    },

    show: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.json({
                    success: false,
                    message: `No product with this id ${req.params.id} found`,
                })
            }

            return res.json(product);

        } catch (error) {
            res.json({
                success: false,
                message: 'Error: ' + error,
            })
        }
    },
    removeById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.json({
                    success: false,
                    message: `No product with this id ${req.params.id} found`,
                })
            }

            await Product.deleteOne({ _id: req.params.id }, (err, result) => {
                if (err) {
                    res.status(400).send(
                        {
                            success: false,
                            message: err,
                        }
                    )
                } else {
                    res.status(200).send({
                        success: true,
                        message: `Successfully deleted product`,
                    })
                }
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Error: ' + error,
            })
        }
    },
    patchById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.json({
                    success: false,
                    message: `No product with this id ${req.params.id} found`,
                })
            }

            let updatedProd = await Product.patchProduct(req.params.id, req.body)

            return res.status(204).send(`Successfully patched product" ${updatedProd}`)
        } catch (error) {
            res.json({
                success: false,
                message: 'Error: ' + error,
            })
        }
    },
    filterProductsByTextInput: async (req, res) => {
        try {
            let relevantProducts = await Product.searchProductText(req.body.searchFor)

            return res.status(200).send(relevantProducts)
        } catch (error) {
            res.json({
                success: false,
                message: 'Error: ' + error,
            })
        }
    }
}
