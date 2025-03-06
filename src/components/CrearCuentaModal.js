import React from 'react';
import { Modal, Input, Form } from 'antd';

const CrearCuentaModal = ({ visible, onOk, onCancel, confirmLoading, form }) => {
  return (
    <Modal
      title="Crear nueva cuenta"
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre de la cuenta"
          rules={[{ required: true, message: 'Por favor ingrese el nombre de la cuenta' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="saldo"
          label="Saldo inicial"
          rules={[{ required: true, message: 'Por favor ingrese el saldo inicial' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CrearCuentaModal;
