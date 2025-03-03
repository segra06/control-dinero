import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

const App = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = async (values) => {
    const { data: user, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('nombre', values.username) // Asegúrate de que 'nombre' es el nombre correcto de la columna
      .eq('contraseña', values.password) // Asegúrate de que 'contraseña' es el nombre correcto de la columna
      .single();

    if (error || !user) {
      setErrorMessage('¡Nombre de usuario o contraseña incorrectos!');
    } else {
      console.log('Usuario:', user);
      message.success('¡Bienvenido!');
      navigate('/dashboard');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Finanzas</Typography.Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: '0px', marginTop: '50px' }}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: '¡Por favor ingrese su nombre de usuario!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: '¡Por favor ingrese su contraseña!',
                },
              ]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Recordarme</Checkbox>
            </Form.Item>
          </Form>
          {errorMessage && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {errorMessage}
            </div>
          )}
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Button type="primary" style={{ width: '100%' }} onClick={() => form.submit()}>
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
