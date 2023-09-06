import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import SortingSelector from "../components/SortingSelector";
import Product from "../components/Product";
import PageNav from "../components/PageNav";

import { useProducts } from "../hooks/useProducts";
import { useSorting } from '../hooks/useSorting';
import { useFilter } from "../hooks/useFilter";
import { useProductsPage } from "../hooks/useProductsPage";
import './MainPage.css';

function Main() {
   const allProducts = useProducts();
   
   /// Sorting
   const [sortBy, setSortBy] = useState('rating');
   const sortedProducts = useSorting(allProducts, sortBy);

   /// Filtering
   const [filters, setFilters] = useState({ 
      search: '', 
      stock: false,
      cat: '', 
      sub: '', 
      price: '', 
      brand: '', 
   });
   const filteredProducts = useFilter(sortedProducts, filters);

   /// Paging
   const [currentPage, setCurrentPage] = useState(1);
   const {
      productsPage,
      prodsAmount,
      prodsPerPage
   } = useProductsPage(filteredProducts, currentPage);

   /// Functions
   const updateSearch = (filters) => {
      setFilters(filters);
      setCurrentPage(1);
   };
   const updateSort = (sort) => {
      setSortBy(sort);
      setCurrentPage(1);
   };

   return <div className='main-container'>
      <Searchbar 
         updateSearch={ updateSearch }
         filtersObj={ filters }
         productList={ filteredProducts } />

      <main className="main">
         <SortingSelector handleChange={ updateSort } />
         
         <hr />
         <div className="product-gallery">
            {
               productsPage.length > 0 ? productsPage.map(
                  (item, index) => <Product 
                     key={ index } 
                     type={ 'gallery' }
                     id={ item.id }
                     image={ item.image }
                     title={ item.title }
                     price={ item.price }
                     rating={ item.rating }
                     stock={ item.stock } />
               )
               :
               <h2>No hay productos</h2>
            }
         </div>
         <hr />

         <PageNav 
            currentPage={ currentPage }
            prodsAmount={ prodsAmount }
            prodsPerPage={ prodsPerPage }
            setCurrentPage={ setCurrentPage } />
      </main>
   </div>
}

export default Main;