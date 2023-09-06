import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo-ecomMerchand.png';
import CartItem from "./CartItem";
import './stylesheets/Header.css';

function Navbar() {

   const { pathname } = useLocation();
   const { cartList, setCartList, cartAmount } = useContext(CartContext);

   return <>
      <header id="header">
         <div className="cart-bar">
            <div id="cart">
               <Link to={ '/cart' }>
                  { cartAmount.toFixed(2) } €

                  <button className="cart-icon">
                     <ion-icon name="cart"></ion-icon>
                  </button>
               </Link>
               {
                  pathname !== '/cart' && <div 
                     className="cart-preview">
                     <ul className="cart-list">
                        {
                           cartList.length > 0 ?
                           cartList.map((item, index) => {
                              return <CartItem 
                                 key={ index }
                                 type={ 'preview' }
                                 id={ item.id }
                                 img={ item.image }
                                 title={ item.title }
                                 price={ item.price }
                                 prodAmount={ item.amount } />
                           })
                           :
                           <h3 className="empty-cart">Carro Vacío</h3>
                        }
                     </ul>
                     
                     <footer>
                        <h2 className="total-amount">
                           Total: { cartAmount.toFixed(2) } €
                        </h2>
                        <div className="cart-options">
                           <button 
                              id="clear-cart"
                              onClick={ () => setCartList([]) }>
                                 VACIAR CARRO
                           </button>

                           <Link to={ '/cart' }>
                              <button id="go-to-cart">
                                    ACABAR COMPRA
                              </button>
                           </Link>
                        </div>
                     </footer>
               </div>
               }
            </div>
         </div>

         <Link to={ '/' }
            className="logo">
            <img src={ logo } alt="Logo e-comMerchand" />
         </Link>

      </header>
   </>
}

export default Navbar;