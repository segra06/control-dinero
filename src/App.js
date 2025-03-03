import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const validUsername = 'sebastian';
const validPassword = '12345';

const App = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const onFinish = (values) => {
    if (values.username === validUsername && values.password === validPassword) {
      message.success('¡Bienvenido!');
      navigate('/dashboard');
    } else {
      setErrorMessage('Que menso');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Finanzas</Typography.Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Contenedor para centrar */}
        <div style={{ marginLeft: '0px', marginTop: '50px' }}> {/* Ajusta el valor de marginLeft según sea necesario */}
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
          <div style={{ marginTop: '10px', textAlign: 'center' }}> {/* Ajusta el valor de marginTop según sea necesario */}
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