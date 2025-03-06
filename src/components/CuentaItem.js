import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const CuentaItem = ({ cuenta }) => {
  const size = Math.min(200, Math.max(100, cuenta.saldo / 5));
  const fontSize = Math.min(24, Math.max(16, cuenta.saldo.toString().length * 2));

  const antIcon = <LoadingOutlined style={{ fontSize: size, color: '#01346E', animationDuration: '3s' }} spin />;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: size }}>
      <div className="spin-container" style={{ width: size, height: size }}>
        <Spin indicator={antIcon} />
      </div>
      <span className="progress-text" style={{ position: 'absolute', fontSize: `${fontSize}px`, color: 'black' }}>
        ₡{cuenta.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default CuentaItem;
