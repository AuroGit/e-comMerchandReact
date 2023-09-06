import data from '../data/products.json';

export const useProducts = () => {

   if (!sessionStorage.getItem('products')) {

      //// Se añaden Rating y Stock random ////
      data.forEach(prod => {
         prod.rating = Math.round(Math.random() * 10);
         prod.stock = Math.random() < .33 ? false : true;
      });
      
      sessionStorage.setItem('products', JSON.stringify(data));
   }

   return JSON.parse(sessionStorage.getItem('products'));
}