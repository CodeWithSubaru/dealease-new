import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Hooks/Context/AuthContext';
import { MessageProvider } from './Hooks/Context/MessageContext';
import { AddressProvider } from './Hooks/Context/AddressContext';
import { OrderProvider } from './Hooks/Context/OrderContext';
import App from './App';
import { ProductProvider } from './Hooks/Context/ProductContext';
import { AddToCartProvider } from './Hooks/Context/AddToCartContext';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { CustomProvider } from 'rsuite';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <MessageProvider>
          <AddressProvider>
            <ProductProvider>
              <AddToCartProvider>
                <OrderProvider>
                  <ProSidebarProvider>
                    <App />
                  </ProSidebarProvider>
                </OrderProvider>
              </AddToCartProvider>
            </ProductProvider>
          </AddressProvider>
        </MessageProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
