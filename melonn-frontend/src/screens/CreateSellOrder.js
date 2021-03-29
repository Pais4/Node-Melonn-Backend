import React, { useState } from 'react'
import './CreateSellOrder.css'
import ecommerce from '../assets/ecommerce.png'
import Form from '../components/Form/Form'
import Product from '../components/Product/Product'

const CreateSellOrder = () => {
    const [listOfProducts, setListOfProducts] = useState([])
    console.log(listOfProducts);
    return (
        <div className='container'>
            <div className='img__container'>
                <img 
                    src={ecommerce}
                    alt='ecommerce img'
                    className='image'
                />
            </div>
            <div className='form__container'>
                <Form 
                    listOfProducts={listOfProducts} 
                    setListOfProducts={setListOfProducts}
                />
            </div>
            <div className='products__container'>
                <h2>List Of Products</h2>
                {(listOfProducts.length < 1) && <h3>No products</h3>}
                {    
                    listOfProducts.map(product => (
                        <Product 
                            key={`${product.productName}-${Math.floor(Math.random()*100)}`}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CreateSellOrder
