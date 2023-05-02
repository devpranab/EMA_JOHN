import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import { useState } from 'react';

const Shop = () => {
//console.log(fakeData);
const first10 = fakeData.slice(0,10);
const [products, setProducts] = useState(first10);
//console.log(products);

    return (
        <div>
         <h3>{products.length}</h3>
         <ul>
            {
                products.map(product => <li>{product.name}</li>)
            }

         </ul>
        </div>
    );
};

export default Shop;