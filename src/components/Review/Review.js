import React, { useState, useEffect } from 'react';
import './Review.css';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        console.log(productKeys);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);//match key
            product.quantity = savedCart[key];
            return product;
        });
        console.log(cartProducts);
        setCart(cartProducts);
    }, []);

    
    const removeProduct = productKey => {
        //console.log("remove product clicked", productKey);
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handlePlaceOrder = () => {
        //console.log("Order Place");
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImg} alt="thank you"/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(product =>
                    <ReviewItem
                        key={product.key}
                        product={product}
                        removeProduct={removeProduct}/>)
            }
            { thankYou }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                <button className="main-button" onClick={handlePlaceOrder}>Place Order</button>
               </Cart>
            </div>
        </div>
    );
};

export default Review;