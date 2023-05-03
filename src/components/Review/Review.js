import React, { useState, useEffect } from 'react';
import './Review.css';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

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

    return (
        <div>
            {
                cart.map(product =>
                    <ReviewItem
                        key={product.key}
                        product={product} />)
            }
        </div>
    );
};

export default Review;