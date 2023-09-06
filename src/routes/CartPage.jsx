import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import './CartPage.css';

const Cart = () => {

  const { cartList, cartAmount, setCartList } = useContext(CartContext);

  return <div className='main-container'>
    <main className='main cart-main'>
      <h1>Carro</h1>
      {
        cartList.length > 0 ?
          cartList.map((item, index) => {
            return <CartItem 
              key={ index }
              type={ 'cart' }
              id={ item.id }
              img={ item.image }
              title={ item.title }
              price={ item.price }
              prodAmount={ item.amount }
              sizes={ item.sizes }
              selectedSize={ item.selectedSize } />
          })
        :
        <>
          <h3 className="empty-cart">Carro Vacío</h3>
          <Link to={ '/' }>
            <button className='back-home'>VOLVER</button>
          </Link>
        </>
      }
    </main>
    <footer id='cartpage-footer'>
      <h2 className="total-amount">
        Total: { cartAmount.toFixed(2) } €
      </h2>
      <div className="cart-options">
        <button 
          id="clear-cart"
          onClick={ () => setCartList([]) }>
            VACIAR CARRO
        </button>

        <button 
          id="pay"
          onClick={ () => {
            const list = cartList.map(item => {
              const size = item.selectedSize ? ' Talla ' + item.selectedSize : '';
              return `${item.title + size} (${item.amount} Uds) - ${(item.price * item.amount).toFixed(2)}€`
            });
            alert(
            'Compra Efectuada:\n\n' + list.join('\n\n')
            + `\n\nTOTAL: ${cartAmount.toFixed(2)}€`
          )
          } }>
          FINALIZAR COMPRA
        </button>
      </div>
    </footer>
  </div>
  
};

export default Cart;