import React from 'react';

const Header = ({ user }) => {
  return (
    <div className="header-container">
      <h1>LOGO</h1>
      <span>Bienvenido, {user.nombre}</span>
    </div>
  );
};

export default Header;
