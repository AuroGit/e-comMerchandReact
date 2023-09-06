import React from 'react';
import './stylesheets/PageNav.css';

const PageNav = ({ currentPage, prodsAmount,
   prodsPerPage, setCurrentPage }) => {

   const totalPages = Math.ceil(prodsAmount / prodsPerPage);
   const pagesArr = [];
   for(let i = 1; i <= totalPages; i++) pagesArr.push(i);

   const handlePageBtn = (page) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
   };

   return (
      <div className='page-nav'>
         <button 
            className="prev"
            onClick={() => {
               currentPage > 1 && handlePageBtn(currentPage - 1)
            }}>
               <ion-icon name="arrow-dropleft"></ion-icon>
         </button>
         {
            pagesArr.map((item, index) => {
               return <button 
                  key={ index }
                  className={ currentPage === item ?
                     'page-btn active' : 'page-btn'}
                  onClick={ () => handlePageBtn(item) }>
                     
                     { item }
               </button>
            })
         }
         <button 
            className="next"
            onClick={() => {
               currentPage < prodsAmount / prodsPerPage && 
               handlePageBtn(currentPage + 1)
            }}>
               <ion-icon name="arrow-dropright"></ion-icon>
         </button>
      </div>
   )
};

export default PageNav;