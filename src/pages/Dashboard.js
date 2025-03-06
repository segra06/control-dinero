import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Dropdown, Button, Form, notification } from 'antd';
import { LoadingOutlined, DownOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabaseClient';
import CrearCuentaModal from '../components/CrearCuentaModal';
import TransaccionModal from '../components/TransaccionModal';
import '../pages/Dashboard.js';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionConfirmLoading, setTransactionConfirmLoading] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  const [form] = Form.useForm();
  const [transactionForm] = Form.useForm();

  useEffect(() => {
    const fetchUserAndCuentas = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          console.error('Error fetching session:', error);
          return;
        }

        const user = session.user;
        if (user) {
          const { data: userData, error: userDataError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('mail', user.email)
            .single();

          if (userDataError) {
            console.error('Error fetching user data:', userDataError);
          } else {
            setUser(userData);

            const { data: cuentaUsuarios, error: cuentaUsuariosError } = await supabase
              .from('cuenta_usuarios')
              .select('cuenta_id')
              .eq('usuario_id', userData.id);

            if (cuentaUsuariosError) {
              console.error('Error fetching cuenta_usuarios data:', cuentaUsuariosError);
            } else {
              const cuentaIds = cuentaUsuarios.map(cuentaUsuario => cuentaUsuario.cuenta_id);

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
      } catch (error) {
        console.error('Error fetching user and cuentas:', error);
        setLoading(false);
      }
    };

    fetchUserAndCuentas();
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);

      const { error } = await supabase.rpc('crear_cuenta_usuario', {
        p_nombre: values.nombre,
        p_saldo: values.saldo,
        p_usuario_id: user.id
      });

      if (error) {
        console.error('Error creating account:', error);
      } else {
        const { data: cuentaUsuarios, error: cuentaUsuariosError } = await supabase
          .from('cuenta_usuarios')
          .select('cuenta_id')
          .eq('usuario_id', user.id);

        if (cuentaUsuariosError) {
          console.error('Error fetching cuenta_usuarios data:', cuentaUsuariosError);
        } else {
          const cuentaIds = cuentaUsuarios.map(cuentaUsuario => cuentaUsuario.cuenta_id);

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

      setModalVisible(false);
      setConfirmLoading(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to create account:', error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const showTransactionModal = (cuenta) => {
    setSelectedCuenta(cuenta);
    setTransactionModalVisible(true);
  };

  const handleTransactionOk = async () => {
    try {
      const values = await transactionForm.validateFields();
      setTransactionConfirmLoading(true);

      if (values.tipo === 'egreso' && values.monto > selectedCuenta.saldo) {
        notification.error({
          message: 'Error de Transacción',
          description: 'Saldo insuficiente para realizar esta transacción.',
        });
        setTransactionConfirmLoading(false);
        return;
      }

      const { error } = await supabase.rpc('agregar_transaccion', {
        p_cuenta_id: selectedCuenta.id,
        p_tipo: values.tipo,
        p_monto: values.monto,
        p_descripcion: values.descripcion
      });

      if (error) {
        console.error('Error adding transaction:', error);
      } else {
        const { data: cuentaUsuarios, error: cuentaUsuariosError } = await supabase
          .from('cuenta_usuarios')
          .select('cuenta_id')
          .eq('usuario_id', user.id);

        if (cuentaUsuariosError) {
          console.error('Error fetching cuenta_usuarios data:', cuentaUsuariosError);
        } else {
          const cuentaIds = cuentaUsuarios.map(cuentaUsuario => cuentaUsuario.cuenta_id);

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

      setTransactionModalVisible(false);
      setTransactionConfirmLoading(false);
      transactionForm.resetFields();
    } catch (error) {
      console.error('Failed to add transaction:', error);
      setTransactionConfirmLoading(false);
    }
  };

  const handleTransactionCancel = () => {
    setTransactionModalVisible(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const items = cuentas.map((cuenta) => {
    const size = Math.min(200, Math.max(100, cuenta.saldo / 5));
    const fontSize = Math.min(24, Math.max(16, cuenta.saldo.toString().length * 2));

    const antIcon = <LoadingOutlined style={{ fontSize: size, color: '#01346E', animationDuration: '3s' }} spin />;

    return {
      key: cuenta.id.toString(),
      label: cuenta.nombre,
      children: (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: size }}>
          <div className="spin-container" style={{ width: size, height: size }}>
            <Spin indicator={antIcon} />
          </div>
          <span className="progress-text" style={{ position: 'absolute', fontSize: `${fontSize}px`, color: 'black' }}>
            ₡{cuenta.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </span>
          <div style={{ marginTop: '20px' }}>
            <Button type="primary" onClick={() => showTransactionModal(cuenta)}>
              Ingresar/Egresar dinero
            </Button>
          </div>
        </div>
      ),
    };
  });

  const menu = {
    items: [
      { key: '1', label: 'Crear cuenta', onClick: showModal },
      { key: '2', label: 'Ingresar/Egresar dinero', onClick: showTransactionModal },
      { key: '3', label: 'Configuraciones' },
      { key: '4', label: 'Datos de la cuenta' },
      { key: '5', label: 'Acerca de' },
      { key: '6', label: 'Cerrar sesión' },
    ],
  };

  const operations = (
    <div style={{ marginRight: 'auto', paddingLeft: '16px' }}>
      <Dropdown menu={menu}>
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
            <Tabs tabBarExtraContent={{ left: operations }} defaultActiveKey="1" items={items} tabBarStyle={{ backgroundColor: '#01346E', color: 'white' }} />
          </div>
        </>
      )}
      <CrearCuentaModal
        visible={modalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        form={form}
      />
      <TransaccionModal
        visible={transactionModalVisible}
        onOk={handleTransactionOk}
        confirmLoading={transactionConfirmLoading}
        onCancel={handleTransactionCancel}
        form={transactionForm}
        cuenta={selectedCuenta}
      />
    </div>
  );
};

export default Dashboard;