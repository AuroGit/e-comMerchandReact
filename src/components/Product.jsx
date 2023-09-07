import React, { useContext, useEffect, useState } from 'react';
import data from '../data/products.json';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import './stylesheets/Product.css';

const Product = ({ 
   type, id, title, price, rating, image, stock, info
}) => {

   const {cartList, setCartList} = useContext(CartContext);
   const [zoomProps, setZoomProps] = useState({
      display:'none', 
      backgroundImage:`url(${require(`../assets/products/${image}`)})`, 
      left:'100%', top:'100%',
      backgroundPosition: '50% 50%',
      backgroundSize: '200%'
   });
   const [added, setAdded] = useState(false);
   const [size, setSize] = useState('');
   const [showZoom, setShowZoom] = useState(false);

   useEffect(() => info?.sizes && setSize(info.sizes[0]), []);

   useEffect(() => {
      cartList.filter(item => item.id == id).length > 0 ? 
      setAdded(true) : setAdded(false);
   }, [cartList]);

   const addToCart = () => {
      if (stock) {
         const [product] = data.filter(item => item.id == id);
         product.amount = 1;
         product.selectedSize = size;
         setCartList([...cartList, product]);
         setAdded(true);
      }
   }
   const ratingToArray = (num) => {
      let array = [];
      if (num === 0) array.push('star-outline');
      else {
         for (let i = 1; i <= num; i++) {
            if (i % 2 === 1) array.push('star-half');
            if (i % 2 === 0) {
               array.pop(); array.push('star');
            }
         }
      }
      return array;
   }

   let className;
   switch (type) {
      case 'single':
         className = 'single-product';
         break;
   
      case 'gallery': default:
         className = 'gallery-product';
         break;
   }

   return <div id={id} className={ className }>
      {
         type === 'single' ?
            <div className='image-container'
               onMouseEnter={ (e) => e.preventDefault() }
               onMouseMove={ (e) => {
                  setZoomProps({
                     ...zoomProps, 
                     display:'block',
                     left: e.clientX - e.target.parentElement.offsetLeft,
                     top: e.clientY - e.target.parentElement.offsetTop + window.scrollY,
                     backgroundPosition: `${
                        ((e.clientX - e.target.parentElement.offsetLeft) / e.target.width) * 100
                     }% ${
                        ((e.clientY - e.target.parentElement.offsetTop + window.scrollY) / e.target.height) * 100
                     }%`,
                     backgroundSize: `${e.target.width * 1.5}px, ${e.target.height * 1.5}px
                     `
                  })
               } }
               onMouseLeave={ (e) => setZoomProps({...zoomProps, display:'none'}) }>
               <img className='product-img' 
                  src={ require(`../assets/products/${image}`) } 
                  alt={ title }
                  style={ {cursor: showZoom ? 'crosshair' : 'zoom-in'} }
                  onClick={ () => setShowZoom(!showZoom) } />
               {
                  showZoom && <div className='zoom' style={ zoomProps }></div>
               }
            </div>
         :
         <img className='product-img' 
            src={ require(`../assets/products/${image}`) } 
            alt={ title } />
      }

      <div className='info-container'>
         <div className="product-info">
            {
               type === 'gallery' ?
               <Link to={`/product/${id}`}>
                  <h2 className='title'>{ title }</h2>
               </Link>
               :
               <h2 className='title'>{ title }</h2>
            }
            <span className='rating'>
               {
                  ratingToArray(rating).map((item, index) => {
                     return <ion-icon key={ index } name={ item }></ion-icon>;
                  })
               }
            </span>
            {
               info && <>
                  <p className="description">
                     { info.description }
                  </p>
                  {
                     info.author && <p>Autor: { info.author }</p>
                  }
                  {
                     info.maker && <p>Fabricante: { info.maker }</p>
                  }
                  {
                     info.editorial && <p>Editorial: { info.editorial }</p>
                  }
                  {
                     info.size && <div>{ 'Tamaño' }: {info.size}</div>
                  }
                  {
                     (info.sizes && info.sizes.length > 0) && <div>{ 'Talla' }: {
                        <select 
                           className='size-select'
                           value={ size }
                           onChange={ (e) => setSize(e.target.value) }>
                           {
                              info.sizes.map((item, index) => {
                                 return <option key={index}>
                                    { item.toUpperCase() }
                                 </option>
                              })
                           }
                        </select>
                     }</div>
                  }
               </>
            }
         </div>

         <button className={ added ? 'cart-btn added' : 'cart-btn' }
            onClick={ () => addToCart() }>
            { added ? 'AÑADIDO' : `${price}€` } 
            <ion-icon name="cart"></ion-icon>
         </button>

         <span className={ stock ? 'stock stock-label' : 'no-stock stock-label' }>
            { stock ? 'En Stock' : 'Sin Stock' }
         </span>
      </div>

   </div>
};

export default Product;