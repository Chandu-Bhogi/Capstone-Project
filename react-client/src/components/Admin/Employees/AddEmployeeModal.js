import React from "react";
import message from "antd/es/message";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { StyleSheet, css } from "aphrodite-jss";
import axios from "../../../utils/axios";
import { v4 as uuidv4 } from "uuid";

const AddEmployeeModal = ({ visible, toggleVisible, setEmployeeArr }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log("OK");
  };

  const onFinish = (values) => {
    console.log(values);

    axios
      .post(`/employees/add`, { _id: uuidv4(), ...values, locked: false, user_type: 1 })
      .then((res) => {
        let newObj = res.data.data;
        setEmployeeArr((prevState) => {
          return [...prevState, newObj];
        });
        message.success(res.data.message);
      })
      .catch((err) => message.error(err));
    form.resetFields();
  };

  return (
    <Modal
      title={"Add Employee"}
      visible={visible}
      footer={[
        <Button key="cancel" onClick={() => toggleVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" onClick={() => form.submit()}>
          Ok
        </Button>,
      ]}
      onOk={handleOk}
      onCancel={() => toggleVisible(false)}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        size="large"
        layout="vertical"
        hideRequiredMark
        className={css(styles.formContainer)}
      >
        <Form.Item
          name="first_name"
          label="first_name"
          rules={[
            {
              type: "string",
              message: "first_name must only contain alphabets!",
            },
          ]}
        >
          <Input placeholder="first_name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="last_name"
          rules={[
            {
              type: "string",
              message: "last_name must only contain alphabets!",
            },
          ]}
        >
          <Input placeholder="last_name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="email"
          rules={[
            {
              type: "string",
              message: "email must only contain alphabets!",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              type: "string",
              message: "password must be alphabets!",
            },
          ]}
        >
          <Input placeholder="password" />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="phone_number"
          rules={[
            {
              type: "string",
              message: "phone_number must only be Numbers!",
            },
          ]}
        >
          <Input placeholder="phone_number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;

const styles = StyleSheet.create({
  formContainer: {
    "& .ant-form-item-label": {
      padding: 0,
      fontSize: 13,
    },
    "& .ant-form-item-label > label": {
      color: "#d9d9d9 !important",
      height: "0px",
    },
  },
});
