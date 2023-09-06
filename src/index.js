import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
// Routes
import MainPage from './routes/MainPage';
import CartPage from './routes/CartPage';
import ProductPage from './routes/ProductPage';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
// CSS
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CartProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route 
            path='/'
            element={ <MainPage /> }>
          </Route>
          
          <Route 
            path='/cart'
            element={ <CartPage /> }>
          </Route>

          <Route 
            path='/product/:prodId'
            element={ <ProductPage /> }>
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>

    <Footer />
  </>
);
