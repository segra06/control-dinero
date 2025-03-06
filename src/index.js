import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client' en vez de 'react-dom'
import AppRouter from './AppRouter'; // Importa AppRouter
import './index.css'; // Importa el archivo de estilos

const root = ReactDOM.createRoot(document.getElementById('root')); // Crear el root
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
