export const useProductsPage = (prods, currentPage) => {
   const prodsPerPage = 9;
   const startPos = (currentPage -1) * prodsPerPage;
   const prodsAmount = prods.length;
   const productsPage = prods.slice(startPos, prodsPerPage * currentPage);

   return {productsPage, prodsAmount, prodsPerPage};
}