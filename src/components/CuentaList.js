
import React from 'react';
import { Tabs, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CuentaItem from './CuentaItem';

const CuentaList = ({ cuentas }) => {
  const items = cuentas.map((cuenta) => ({
    key: cuenta.id.toString(),
    label: cuenta.nombre,
    children: <CuentaItem cuenta={cuenta} />,
  }));

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Tus Cuentas" key="1">
        {items.map(item => (
          <div key={item.key}>{item.children}</div>
        ))}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default CuentaList;
