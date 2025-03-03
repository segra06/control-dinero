import React from 'react';
import { Button, Checkbox, Form, Input, message, Typography } from 'antd'; // Importa Typography
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate

const validUsername = 'sebastian';  // Credenciales predefinidas
const validPassword = '12345';

const App = () => {
  const navigate = useNavigate();  // Usamos useNavigate en lugar de useHistory

  const onFinish = (values) => {
    if (values.username === validUsername && values.password === validPassword) {
      message.success('¡Bienvenido!');
      navigate('/dashboard');  // Redirigir al Dashboard
    } else {
      message.error('Usuario o contraseña incorrectos');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>Control de Dinero</Typography.Title> {/* Agrega el título */}
      <Form
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
              message: 'Por favor ingrese su nombre de usuario!',
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
              message: 'Por favor ingrese su contraseña!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
