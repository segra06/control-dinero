import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import './global.css'; // Importa el archivo CSS global

const App = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = async (values) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMessage('¡Correo electrónico o contraseña incorrectos!');
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
              label="Correo Electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: '¡Por favor ingrese su correo electrónico!',
                },
                {
                  type: 'email',
                  message: '¡Por favor ingrese un correo electrónico válido!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
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
