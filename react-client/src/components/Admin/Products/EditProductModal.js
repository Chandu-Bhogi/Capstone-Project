import React from "react";
import message from "antd/es/message";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { StyleSheet, css } from "aphrodite-jss";
import axios from "../../../utils/axios";

const EditProductModal = ({ type, form, product, onFinish }) => {
  return (
    <Form
      form={form}
      name="basic"
      initialValues={
        type == "update"
          ? {
              name: product.name,
              price: product.price,
              quantity: product.quantity,
            }
          : null
      }
      onFinish={onFinish}
      size="large"
      layout="vertical"
      hideRequiredMark
      className={css(styles.formContainer)}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            type: "string",
            message: "Name must only contain alphabets!",
          },
          {
            required: true,
            message: "Please input your Institute Name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            type: "number",
            message: "Name must only Numbers!",
          },
          {
            required: true,
            message: "Please input Price!",
          },
        ]}
      >
        <InputNumber placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        rules={[
          {
            type: "number",
            message: "Name must only Numbers!",
          },
          {
            required: true,
            message: "Please input Quantity!",
          },
        ]}
      >
        <InputNumber placeholder="Quantity" />
      </Form.Item>
    </Form>
  );
};

export default EditProductModal;

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
