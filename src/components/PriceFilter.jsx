import React from 'react';
import './stylesheets/PriceFilter.css';

const PriceFilter = (props) => {

   // const maxRange = 200;

   return (
      <div className='input-price'>
         <label htmlFor="min">
            Min
            <span className="value">{ props.min + '€' }</span>
         </label>

         { props.children }

         
         { 
            /// Custom Price Slider
         /* <div className="double-slider">
            <div className="slider">
               <span className="range" style={{
                  left: `${min / (maxRange/100)}%`, 
                  right: `${(maxRange - max) / (maxRange / 100)}%`
               }}></span>
            </div>
            <div className="range-inputs">
               <input type="range" id="min" name="min" 
                  min='0' max={ maxRange } step='1' value={ min }
                  onChange={ (e) => handleChange(e.target) } 
               />
               <input type="range" id="max" name="max" 
                  min='0' max={ maxRange } step='1' value={ max }
                  onChange={ (e) => handleChange(e.target) } 
               />
            </div>
         </div> */
         }
         <label htmlFor="max">
            Max
            <span className="value">{ props.max + '€' }</span>
         </label>
      </div>
   )
};

export default PriceFilter;