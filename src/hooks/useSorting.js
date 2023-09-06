export const useSorting = (prods, sortBy) => {
   switch (sortBy) {
      case 'a-z':
         prods.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
         });
         break;
      case 'z-a':
         prods.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            return 0;
         });
         break;
      case 'price-higher-lower':
         prods.sort((a, b) => {
            return b.price - a.price
         });
         break;
      case 'price-lower-higher':
         prods.sort((a, b) => { 
            return a.price - b.price
         });
         break;
      case 'rating': default:
         prods.sort((a, b) => {
            return b.rating - a.rating
         });
         break;
   }

   return prods;
}