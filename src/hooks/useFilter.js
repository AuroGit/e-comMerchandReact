export const useFilter = (prods, filters) => {
   let filteredProducts = prods;

   if (!filters.search && !filters.stock && !filters.cat && 
      !filters.sub && !filters.brand && !filters.price) return prods;
   else {
      if (filters.search.trim()) {
         filteredProducts = filteredProducts ? 
         filteredProducts.filter(item => item.title.toLowerCase()
         .includes(filters.search.trim()))
         :
         prods.filter(item => item.title.toLowerCase()
         .includes(filters.search.trim()));
      }
   
      if (filters.stock) {
         filteredProducts = filteredProducts ? 
         filteredProducts.filter(item => item.stock)
         :
         prods.filter(item => item.stock);
      } else if (!filteredProducts) filteredProducts = prods;
   
      if (filters.cat) {
         filteredProducts = filteredProducts ? 
         filteredProducts.filter(item => item.category.includes(filters.cat))
         :
         prods.filter(item => item.category.includes(filters.cat));
         
         if (filters.sub) {
            filteredProducts = filteredProducts ?
            filteredProducts.filter(item => item.subCategory?.includes(filters.sub))
            :
            prods.filter(item => item.subCategory?.includes(filters.sub));
         }
         if (filters.brand) {
            filteredProducts = filteredProducts ? 
            filteredProducts.filter(item => item.franchise?.includes(filters.brand))
            : 
            prods.filter(item => item.franchise?.includes(filters.brand));
         }
      } else {
         if (filters.brand) {
            filteredProducts = filteredProducts ? 
            filteredProducts.filter(item => item.franchise?.includes(filters.brand))
            : 
            prods.filter(item => item.franchise?.includes(filters.brand));
         }
      }
   
      if (filters.price) {
         const [min, max] = filters.price.split('-');
         filteredProducts = filteredProducts ?
         filteredProducts.filter(item => {
            if (item.price >= parseInt(min) && 
            item.price <= parseInt(max)) return item;
         })
         :
         prods.filter(item => {
            if (item.price >= parseInt(min) && 
            item.price <= parseInt(max)) return item;
         });
      }

   }
   
   return filteredProducts;
}