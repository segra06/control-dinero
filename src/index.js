import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client' en vez de 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Crear el root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
