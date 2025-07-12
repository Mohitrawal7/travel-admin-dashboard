import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const CreateTourModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="Create a New Tour"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="name"
                    label="Tour Name"
                    rules={[{ required: true, message: 'Please input the name of the tour!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: 'Please input the country!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTourModal;