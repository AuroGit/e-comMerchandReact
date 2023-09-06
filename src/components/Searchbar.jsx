import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';
import PriceFilter from './PriceFilter';
import PriceSlider from 'react-slider';
import './stylesheets/Searchbar.css';
import './stylesheets/PriceFilter.css';

const Searchbar = ({ filtersObj, updateSearch }) => {
   /// Search
   const maxSuggests = 10;
   const [input, setInput] = useState('');
   const [suggestionsList, setSuggestionList] = useState([]);
   
   const handleInput = (e) => {
      setInput(e.target.value);

      const suggestions = sortSuggestions(products, e.target.value)
      suggestions.length === products.length ? 
      setSuggestionList([])
      :
      setSuggestionList(suggestions);
   };
   const sortSuggestions = (products, input) => {
      const suggestions = products.filter(item => {
         return item.title.toLowerCase().includes(input);
      });
      suggestions.sort((current, prev) => {
         return current.title.toLowerCase().indexOf(input) - prev.title.toLowerCase().indexOf(input);
      }); 

      return suggestions;
   }

   /// Filters
   const [stockFilter, setStockFilter] = useState(false);
   const [showFilters, setShowFilters] = useState(false);
   const [showSubcats, setShowSubcats] = useState(false);
   const catSelectRef = useRef(null);

      /// Subcategory
   const [subcatValue, setSubcatValue] = useState('');
   const getSubcategories = () => {
      let subcategories = products.filter(
         item => item.category === catSelectRef.current.value
      ).map(item => item.subCategory && item.subCategory);
      subcategories = [...new Set(subcategories)];
      
      if (subcategories.length > 0 && subcategories
      .filter(item => item === undefined).length === 0 )
         return subcategories;
   };
      /// Brand
   const [brandValue, setBrandValue] = useState('');
   const getBrands = () => {
      let brands = products.filter(item => {
         return item.category === catSelectRef.current?.value 
         && item.franchise !== undefined
      }).map(item => item.franchise);
      if (brands.length > 0 && brands
      .filter(item => item === undefined).length === 0 )
         return [...new Set(brands)];
      else return [...new Set(products.filter(item => item.franchise 
         !== undefined).map(item => item.franchise))];
   }

      /// Price
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(200);
   const handleChange = (target) => {
      switch (target.index) {
         case 0:
            setMinPrice(target.value[0]);            
            break;
         case 1:
            setMaxPrice(target.value[1]);
            break;
      }
   }

   return <>
      <div className='searchbar-container'>
         <form id="search-form">
            <button 
               onClick={ (e) => {
                  e.preventDefault();
                  if (showFilters) {
                     updateSearch({
                        ...filtersObj,
                        stock: false,
                        cat: '',
                        sub: '',
                        price: '',
                        brand: ''
                     });
                  }
                  setShowFilters(!showFilters);
                  setStockFilter(false);
               } }
               title='Búsqueda Avanzada'>

               <ion-icon name="options"></ion-icon>
            </button>

            <div className="search-bar">
               <input 
                  type="search"
                  value={ input }
                  onChange={ handleInput } />
               <ul className="suggestions">
                  {
                     suggestionsList.length > 0 && suggestionsList?.map((item, index) => {
                        if (index < maxSuggests ) return <li key={ index }>
                           <Link to={`/product/${item.id}`}>
                              { item.title }
                           </Link>
                        </li>
                     })
                  }
               </ul>   
            </div>

            <button 
               type="submit"
               onClick={ (e) => {
                  e.preventDefault();
                  updateSearch({...filtersObj, search: input});
               } }>

               <ion-icon name="search"></ion-icon>
            </button>
         </form>
      </div>

      <div className={ showFilters ? 'filters-container active' : 'filters-container' }>
         <form className='filters'>

            <div className="filter stock-filter">
               <label>Mostrar:</label>
               <div className='stock-options'>
                  <span className='stock-option'>
                     <label id='show-all'>
                        <input checked={ !stockFilter }
                           type="radio" 
                           name='stock' 
                           value={ false }
                           onChange={ (e) => {
                              updateSearch({...filtersObj, stock:(e.target.value === 'true')});
                              setStockFilter(!stockFilter);
                           } } />
                        Todo
                     </label>
                  </span>
                  <span className="stock-option">
                     <label id='show-stock'>
                        <input checked={ stockFilter }
                           type="radio" 
                           name='stock' 
                           value={ true }
                           onChange={ (e) => {
                              updateSearch({...filtersObj, stock:(e.target.value === 'true')});
                              setStockFilter(!stockFilter);
                           } } />
                        Solo productos con Stock
                     </label>
                  </span>
               </div>
            </div>

            <select ref={ catSelectRef }
               id="cat-select" 
               className='filter'
               onChange={ (e) => {
                  updateSearch({
                     ...filtersObj, 
                     sub: '',
                     brand: '',
                     cat:e.target.value
                  });
                  setSubcatValue('');
                  setBrandValue('');
                  setShowSubcats(true);
               }}>
               <option className='opt' value="">-CATEGORÍA-</option>
               <option className='opt' value='figuras'>FIGURAS</option>
               <option className='opt' value='comics'>COMICS</option>
               <option className='opt' value='merchandising'>MERCHANDISING</option>
               <option className='opt' value='ropa'>ROPA</option>
               <option className='opt' value='juegos de mesa'>JUEGOS DE MESA</option>
            </select>

            <select disabled={ catSelectRef.current?.value ? false : true }
               id="subcat-select" 
               className='filter'
               value={ subcatValue }
               onChange={ (e) => {
                  setSubcatValue(e.target.value);
                  updateSearch({...filtersObj, sub:e.target.value});
               }}>
               <option className='opt' value="">-SUBCATEGORÍA-</option>
               {
                  showSubcats && getSubcategories()?.map(
                     (item, index) => <option 
                        key={ index }
                        className='opt'
                        value={ item }>
                           { item?.toUpperCase() }
                     </option>
                  )
               }
            </select>
            
            <select 
               id="brand-select" 
               className='filter'
               value={ brandValue }
               onChange={ (e) => {
                  setBrandValue(e.target.value);
                  updateSearch({...filtersObj, brand:e.target.value});
               }}>
               <option className='opt' value="">-MARCA/FRANQUICIA-</option>
               {
                  getBrands().map((item, index) => {
                     return <option 
                        key={ index }
                        className='opt'
                        value={ item }>
                           { item?.toUpperCase() }
                     </option>
                  })
               }
            </select>

            <PriceFilter 
               handleChange={ handleChange }
               filtersObj={ filtersObj }
               updateSearch={ updateSearch }
               max={ maxPrice }
               min={ minPrice }>
                  <PriceSlider
                     className='horizontal-slider'
                     thumbClassName='example-thumb'
                     trackClassName='example-track'
                     min={0}
                     max={200}
                     minDistance={10}
                     defaultValue={[minPrice, maxPrice]}
                     onChange={ (value, index) => 
                        handleChange({index, value}) }
                     onAfterChange={(value) => {
                        updateSearch({...filtersObj, price: `${value[0]}-${value[1]}`})
                     } }
                     renderThumb={ (props, state) => {
                        return <div {...props}>{ state.valueNow }</div>
                     } } />
            </PriceFilter>
         </form>
      </div>
   </>
}

export default Searchbar;