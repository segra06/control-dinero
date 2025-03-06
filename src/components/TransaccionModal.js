import React from 'react';
import { Modal, Input, Form, Radio } from 'antd';

const TransaccionModal = ({ visible, onOk, onCancel, confirmLoading, form, cuenta }) => {
  return (
    <Modal
      title={`Ingresar/Egresar dinero - ${cuenta ? cuenta.nombre : ''}`}
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="tipo"
          label="Tipo de transacción"
          rules={[{ required: true, message: 'Por favor seleccione el tipo de transacción' }]}
        >
          <Radio.Group>
            <Radio value="ingreso">Ingreso</Radio>
            <Radio value="egreso">Egreso</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="monto"
          label="Monto"
          rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransaccionModal;