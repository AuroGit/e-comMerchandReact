import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './stylesheets/CartItem.css';

const ProductPreview = ({ 
  type, id, img, title, price, prodAmount, sizes, selectedSize
}) => {
  
  const {cartList, setCartList} = useContext(CartContext);
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState('');

  useEffect(() => {
    prodAmount && setAmount(prodAmount);
    selectedSize && setSize(selectedSize);
  });

  const remveProduct = () => {
    const newCartList = cartList.filter(item => {
      return item.id !== id;
    });
    setCartList(newCartList);
  };
  const handleAmountChange = (value) => {
    setAmount(value);
    const updatedCartList = cartList.map(item => {
      if (item.id === id) item.amount = value;
      return item;
    });
    setCartList(updatedCartList);
  };
  const handleSizeChange = (value) => {
    setAmount(value);
    const updatedCartList = cartList.map(item => {
      if (item.id === id) item.selectedSize = value;
      return item;
    });
    setCartList(updatedCartList);
  };

  let className;
  switch (type) {
    case 'cart':
      className = 'cart-product';
      break;
  
    case 'preview': default:
      className = 'product-preview';
      break;
  }

  return <div className={ className }>
    <div className="thumbnail">
      <img src={ require(`../assets/products/${img}`) } alt={ title } />
    </div>

    <div className="product-info">
      <Link to={ `/product/${id}` }>
        <h3 className="prod-title">
          { title }
        </h3>
      </Link>
      
      <div className="price-x-amount">
        <p className="price">{ price } €</p>
        <ion-icon id='multiply' name="close"></ion-icon>
        
        <input 
          className='amount'
          min={ 1 }
          max={ 99 }
          type="number" 
          onChange={ (e) => handleAmountChange(e.target.value) }
          value={ amount }
          />
        { type === 'cart' && <>
          <ion-icon name="arrow-round-forward"></ion-icon>
          <p className="total-price">
            {
              (price * amount).toFixed(2)
            } €
          </p>
        </> }
      </div>
      {
        (sizes && sizes?.length > 0) && <div>{ 'Talla' }: {
          <select 
            className='size-select'
            value={ size }
            onChange={ (e) => handleSizeChange(e.target.value) }>
            {
              sizes.map((item, index) => {
                return <option key={index}>
                  { item.toUpperCase() }
                </option>
              })
            }
          </select>
        }</div>
      }
    </div>

    <button
      title='Quitar producto'
      className="remove-btn"
      onClick={ () => remveProduct(id) }>
      <ion-icon name="trash"></ion-icon>
    </button>
  </div>
};

export default ProductPreview;