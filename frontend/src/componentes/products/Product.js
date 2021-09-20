import React from 'react'



const Info = () => {
    return (
        <div className="product-info">
        <div className="icon">
            <i class="fas fa-shopping-cart"></i>
        </div>
        <div className="icon">
            <i class="far fa-heart"></i>
        </div>
        <div className="icon">
            <i class="fas fa-search"></i>
        </div>
        </div>
    )
}

const Product = ({item}) => {
    return (
        <div className="product-container">
            <div className="circle"/>
            <img className="product-image" alt="product" src ={item.img}/>
            <Info>
            </Info>
        </div>
    )
}

export default Product
