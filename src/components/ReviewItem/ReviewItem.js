import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, quantity, price, key } = props.product;
    //console.log(props);
    return (
        <div className="review-item">
            <h4 className="item-header">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <button className="main-button" onClick={() => props.removeProduct(key)} >Remove</button>
        </div>
    );
};

export default ReviewItem;