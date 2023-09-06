import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {

   const [cartList, setCartList] = useState([]);
   const [cartAmount, setCartAmount] = useState(0);
   
   /// Cuando carga la pagina, si no hay datos del
    // cartAmount ni cartList, los crea en sessionStorage
    // y luego carga los datos del sessionStorage
   useEffect(() => {
      if (!sessionStorage.getItem('cart')) {
         sessionStorage.setItem('cart', 
            JSON.stringify({cartAmount, cartList}));
      }
      setCartAmount(parseFloat(JSON.parse(sessionStorage.getItem('cart')).cartAmount));
      setCartList(JSON.parse(sessionStorage.getItem('cart')).cartList);
   }, []);

   /// Cada vez que cambia cartAmount o cartList se
    // actualiza en el sessionStorage
   useEffect(() => sessionStorage.setItem('cart', 
      JSON.stringify({cartAmount, cartList})), 
   [cartAmount, cartList]);

   useEffect(() => updateCartAmount(), [cartList]);

   const updateCartAmount = () => {
      let total = 0;
      cartList.forEach(item => {
         total += item.price * item.amount;
      });
      setCartAmount(total);
   };

   return (
      <CartContext.Provider 
         value={{
            cartList, 
            setCartList,
            cartAmount,
            setCartAmount
         }}>
            { children }
      </CartContext.Provider>
   );
}
