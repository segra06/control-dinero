import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './pages/App.js';
import Dashboard from './pages/Dashboard.js'; // Asegúrate de tener un componente Dashboard

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default AppRouter;