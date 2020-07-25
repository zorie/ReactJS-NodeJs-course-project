import React, { useEffect, useState } from 'react'
import {
    Box,
} from '@material-ui/core'
import { api } from './../config/axios.js'
import ProductItem from './productItem'

function ProductDashboard(props) {
    let [product, setProduct] = useState({})

    useEffect(() => {
        api.get(`/products/${props.match.params.id}`)
            .then(({ data }) => {
                setProduct({
                    id: data._id,
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    photoLink: data.photoLink,
                    brand: data.brand
                })
            })
    }, [props.match.params.id])

    return (
        <Box>
            <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                type={product.type}
                brand={product.brand}
                photoLink={product.photoLink}
                shouldHideViewButton='true' />
        </Box>
    )
}

export default ProductDashboard
