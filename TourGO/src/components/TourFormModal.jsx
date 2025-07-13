import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
// import Space from 'antd';
const { TextArea } = Input;

const TourFormModal = ({ visible, onCreate, onCancel,initialValues }) => {
    const [form] = Form.useForm();
    const isEditing = !!initialValues;

     useEffect(() => {
        if (isEditing) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form, isEditing]);

    return (
        <Modal
            visible={visible}
            title={isEditing ? "Edit Tour" : "Create Tour"}
            okText={isEditing ? "Update" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                    
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

export default TourFormModal;