import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Menu, Dropdown, Button } from 'antd';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import { supabase } from './supabase';
import './Dashboard.css'; // Importa el archivo CSS

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndCuentas = async () => {
      // Obtén la sesión actual
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Error fetching session:', error);
        return;
      }

      // Obtén el usuario autenticado desde la sesión
      const user = session.user;

      if (user) {
        // Realiza la consulta para obtener la información del usuario en la tabla 'usuarios'
        const { data: userData, error: userDataError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('mail', user.email) // Utiliza la columna correcta 'mail' en lugar de 'email'
          .single();

        if (userDataError) {
          console.error('Error fetching user data:', userDataError);
        } else {
          setUser(userData);

          // Realiza la consulta para obtener las cuentas asociadas al usuario
          const { data: cuentaUsuarios, error: cuentaUsuariosError } = await supabase
            .from('cuenta_usuarios')
            .select('cuenta_id')
            .eq('usuario_id', userData.id);

          if (cuentaUsuariosError) {
            console.error('Error fetching cuenta_usuarios data:', cuentaUsuariosError);
          } else {
            const cuentaIds = cuentaUsuarios.map(cuentaUsuario => cuentaUsuario.cuenta_id);

            // Realiza la consulta para obtener los nombres y saldos de las cuentas
            const { data: cuentasData, error: cuentasDataError } = await supabase
              .from('cuentas')
              .select('id, nombre, saldo')
              .in('id', cuentaIds);

            if (cuentasDataError) {
              console.error('Error fetching cuentas data:', cuentasDataError);
            } else {
              setCuentas(cuentasData);
            }
          }
        }
      }

      setLoading(false);
    };

    fetchUserAndCuentas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const items = cuentas.map((cuenta) => {
    const size = Math.min(200, Math.max(100, cuenta.saldo / 5)); // Ajusta el tamaño del círculo en función del saldo
    const fontSize = Math.min(24, Math.max(16, cuenta.saldo.toString().length * 2)); // Ajusta el tamaño de la fuente en función del saldo

    const antIcon = <LoadingOutlined style={{ fontSize: size, color: '#01346E', animationDuration: '3s' }} spin />;

    return {
      key: cuenta.id.toString(),
      label: cuenta.nombre,
      children: (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: size }}>
          <div className="spin-container" style={{ width: size, height: size }}>
            <Spin indicator={antIcon} />
          </div>
          <span className="progress-text" style={{ position: 'absolute', fontSize: `${fontSize}px`, color: 'black' }}>
            ₡{cuenta.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </span>
        </div>
      ),
    };
  });

  const menu = (
    <Menu>
      <Menu.Item key="1">Crear cuenta</Menu.Item>
      <Menu.Item key="2">Configuraciones</Menu.Item>
      <Menu.Item key="3">Datos de la cuenta</Menu.Item>
      <Menu.Item key="4">Acerca de</Menu.Item>
      <Menu.Item key="5">Cerrar sesión</Menu.Item>
    </Menu>
  );

  const operations = (
    <div style={{ marginRight: 'auto', paddingLeft: '16px' }}>
      <Dropdown overlay={menu}>
        <Button>
          ||| <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
  

  return (
    <div className="dashboard-container">
      {user && (
        <>
          <div className="header-container">
            <h1>LOGO</h1>
            <span>Bienvenido, {user.nombre}</span>
          </div>
          <div className="tabs-container">
            <Tabs tabBarExtraContent={{ left: operations }} defaultActiveKey="1" items={items} tabBarStyle={{ backgroundColor: '#01346E', color: 'white' }}>
              <Tabs.TabPane tab="Tus Cuentas" key="1">
                {items.map(item => (
                  <div key={item.key} className="tab-content">{item.children}</div>
                ))}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;