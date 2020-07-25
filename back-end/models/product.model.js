const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        photoLink: String
    }
)

module.exports.schema = productSchema

const Product = mongoose.model('Product', productSchema)

module.exports.model = Product

module.exports.model.patchProduct = (id, productData) => {
    return new Promise((resolve, reject) => {
        Product.findById(id, function (err, productToUpdate) {
            if (err) reject(err)

            console.log('PRODUCT TO UPDATEEE')
            console.log(productToUpdate)
            console.log(productData)

            for (let i in productData) {
                productToUpdate[i] = productData[i]
            }

            productToUpdate.save(function (err, updatedProduct) {
                if (err) return reject(err)
                resolve(updatedProduct)
            })
        })
    })
}

module.exports.model.searchProductText = (searchText) => {
    return new Promise((resolve, reject) => {
        Product.find({ $text: { $search: `${searchText}` }}, function (err, results) {
            if (err) reject(err)

            console.log("THE RESUUUUULTSSS")
            console.log(results)

            resolve(results)
        })
    })
}