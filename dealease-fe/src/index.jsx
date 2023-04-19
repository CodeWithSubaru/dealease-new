import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Hooks/Context/AuthContext';
import { MessageProvider } from './Hooks/Context/MessageContext';
import { AddressProvider } from './Hooks/Context/AddressContext';
import App from './App';
import { ProductProvider } from './Hooks/Context/ProductContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <MessageProvider>
          <AddressProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </AddressProvider>
        </MessageProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
