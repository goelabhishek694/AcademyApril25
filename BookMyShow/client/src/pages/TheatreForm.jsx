import React from 'react'
import {Form, Input, Modal, message} from 'antd';
import {addTheatre, getMyTheatres} from '../api/theatre';

function TheatreForm({open, setOpen, onSuccess, selectedTheatre}) {

    const [form] = Form.useForm();
    const onFinish = async(values) => {
        console.log("values", values);
        // let response = null;
        const response = await addTheatre(values);
        if(response.success){
            setOpen(false);
            form.resetFields();
            onSuccess();
        }else{
            message.error(response.message);
        }
        
    }

  return (
    <Modal title={selectedTheatre ? "Edit Theatre" : "Add Theatre"} open={open} onCancel={() => {
        setOpen(false); form.resetFields();
    }} onOk={() => form.submit()} okText="Add">

        <Form initialValues={selectedTheatre} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Theatre Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Eg. PVR Phoenix"/>
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true}, { min: 10, max: 10, message: 'Must be 10 characters!' }]}>
          <Input placeholder="Eg. 9876543210"/>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="Eg. pvr@gmail.com"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TheatreForm
