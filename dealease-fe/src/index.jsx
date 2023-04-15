import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './Hooks/Context/AuthContext';
import { MessageProvider } from './Hooks/Context/MessageContext';
import { AddressProvider } from './Hooks/Context/AddressContext';
import App from './App';
import { PostProvider } from './Hooks/Context/PostContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <MessageProvider>
          <AddressProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </AddressProvider>
        </MessageProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
