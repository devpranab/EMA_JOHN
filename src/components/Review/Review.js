import React, { useState, useEffect } from 'react';
import './Review.css';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([]);

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
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;