import React from 'react';
import './Product.css';

const Product = (props) => {
    //console.log(props.product);
    const { name, img, price, stock, seller } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <br/>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
            </div>
        </div>
    );
};

export default Product;