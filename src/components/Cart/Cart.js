import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';


const Cart = (props) => {
    const cart = props.cart;

    // const total = cart.reduce((total , prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        console.log(product);
        total = total + product.price  * product.quantity;
        //debugger;
    }

    //shipping
    let shipping = 0;
    if (total > 500) {
        shipping = 0;
    }
    else if (total > 300) {
        shipping = 5.99;

    } else if (total > 0) {
        shipping = 12.99;
    }

    //tax
    const tax = (total / 10).toFixed(2);//10%

    //grand total
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    //format number
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Order : {cart.length}</p>
            <p>Product Price : {total}</p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <p><small>Tax+VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;