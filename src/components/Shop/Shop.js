import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    //console.log(products);

    const handleAddProduct = (product) => {
        console.log("Product Added", product);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                    products.map((product) => <Product product={product} handleAddProduct={handleAddProduct}></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <h3>This is cart</h3>
            </div>
        </div>
    );
};

export default Shop;