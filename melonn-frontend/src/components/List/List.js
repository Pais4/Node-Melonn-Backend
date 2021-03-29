import React from 'react'
import './List.css'

const List = ({order}) => {

    console.log(order);

    return (
        <div className='item__container'>
            <div className='card__item'>
                <div className='header'>
                    <h1>{order.externalOrderNumber}</h1>
                </div>
            </div>
        </div>
    )
}

export default List
