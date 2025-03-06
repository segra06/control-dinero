import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const MenuDropdown = ({ showModal }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showModal}>Crear cuenta</Menu.Item>
      <Menu.Item key="2">Configuraciones</Menu.Item>
      <Menu.Item key="3">Datos de la cuenta</Menu.Item>
      <Menu.Item key="4">Acerca de</Menu.Item>
      <Menu.Item key="5">Cerrar sesión</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        ||| <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
