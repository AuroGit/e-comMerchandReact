import React from 'react';
import './stylesheets/SortingSelector.css';

const OrderSelector = ({ handleChange }) => {

  return <div className='sort-select'>
    <label htmlFor="order">Ordenar por:</label>
    <select name='order' 
      onChange={ (e) => handleChange(e.target.value) }>

      <option value="rating">Valoración</option>
      <option value="a-z">De la A a la Z</option>
      <option value="z-a">De la Z a la A</option>
      <option value="price-lower-higher">Precio ascendente</option>
      <option value="price-higher-lower">Precio descendente</option>
    </select>
   </div>
};

export default OrderSelector;