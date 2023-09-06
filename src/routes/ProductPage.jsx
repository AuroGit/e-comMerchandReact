import React, { useEffect } from 'react';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useProducts } from "../hooks/useProducts";

const ProductPage = () => {

   const { prodId } = useParams('prodId');
   const [{
      type, id, title, price, rating, image, stock, ...info
   }] = useProducts().filter(item => item.id === parseInt(prodId));
   
   return <div className='main-container'>
      <main className='main'>
         <Product 
            type={ 'single' }
            id={ prodId }
            image={ image }
            title={ title }
            price={ price }
            rating={ rating }
            stock={ stock }
            info={ info } />
      </main>
   </div>
};

export default ProductPage;