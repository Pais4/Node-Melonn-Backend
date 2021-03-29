import React from 'react'
import './Product.css'

const Product = ({product}) => {
    return (
        <div className='card__container'>
            <div className='card__body'>
                <h4>{product.productName}</h4>
                <p>Quantity: <span>{product.productQty}</span></p>
                <p>Weigth: <span>{product.productWeigth}</span></p>
            </div>
        </div>
    )
}

export default Product
