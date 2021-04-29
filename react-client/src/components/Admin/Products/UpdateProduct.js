import React from "react";
import message from "antd/es/message";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { StyleSheet, css } from "aphrodite-jss";
import axios from "../../../utils/axios";
import EditProductModal from "./EditProductModal";
import { v4 as uuidv4 } from "uuid";

const UpdateProduct = ({
  type,
  visible,
  toggleVisible,
  product,
  setproductArr,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    console.log("OK");
  };

  const onFinish = (values) => {
    console.log(values);
    if (type == "update") {
      axios
        .put(`/products/update/${product._id}`, values)
        .then((res) => {
          let newObj = res.data.data;
          setproductArr((prevState) => {
            return [...prevState.filter((obj) => obj._id !== product._id), newObj];
          });
          message.success(res.data.message);
        })
        .catch((err) => message.error(err));
    } else {
      let newID = uuidv4()
      console.log(newID)
      axios
        .post(`/products/add`, { _id: newID, ...values })
        .then((res) => {
          let newObj = res.data.data;
          setproductArr((prevState) => {
            return [...prevState, newObj];
          });
          message.success(res.data.message);
        })
        .catch((err) => message.error(err));
      form.resetFields();
    }
  };

  return (
    <Modal
      title={type == "update" ? "Update Product" : "Add Product"}
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
      <EditProductModal
        type={type}
        form={form}
        product={product}
        onFinish={onFinish}
      />
    </Modal>
  );
};

export default UpdateProduct;

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
