import React, { useEffect } from "react";
import Button from "antd/es/button";
import Form from "antd/es/form";
import message from "antd/es/message";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite-jss";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import UniInput from "../../UniStyles/UniInput";
import axios from "../../utils/axios";
import { LockOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal";
import { Input } from "antd";
import { getUserDetails } from "../../utils";
let user = JSON.parse(localStorage.getItem("user_data_TCS"));

const EditProfile = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`/profile/getUser/${user.user._id}`)
      .then((res) => form.setFieldsValue(res.data.data));
  }, []);

  const onFinish = (values) => {
    console.log(values);
    axios
      .put("/auth/EditProfile", { ...getUserDetails(), ...values })
      .then((res) => {
        if (res.status === 200) {
          message.success("Password changed successfully!");
          handleCancel();
        }
      });
  };
  //   email: "dpdhruvpatel1996@gmail.com"
  //   first_name: "Ronik"
  //   funds: 21
  //   last_name: "Patel"
  //   locked: false
  //   password: "12345"
  //   phone_number: "4804170346"
  //   user_type: 2
  return (
    <Modal
      bodyStyle={{
        height: "40vh",
        // padding: 64,
        backgroundColor: "#F5F8FA",
        display: "flex",
        flexDirection: "column",
      }}
      width="30%"
      // title={false}
      visible={visible}
      closable={false}
      footer={false}
      onCancel={handleCancel}
    >
      <div className={css(styles.container)}>
        <Form
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
          hideRequiredMark
          className={css(styles.formContainer)}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <UniInput disabled size="small" type="input" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first_name!",
              },
            ]}
          >
            <UniInput size="small" type="input" placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <UniInput size="small" type="input" placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone_number!",
              },
            ]}
          >
            <UniInput size="small" type="input" placeholder="phone_number" />
          </Form.Item>

          <Button htmlType="submit" className={css(styles.submit)}>
            Change Profile Details
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    paddingTop: "15%",
  },
  formContainer: {
    width: "500px",
    padding: "0 24px",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  submit: {
    width: "100%",
    color: "#FFF",
    backgroundColor: globalStyles.secondary,
  },
  inlineFields: {
    "@media (max-width: 600px)": {
      display: "flex",
    },
  },
  bottomContext: {
    textAlign: "center",
    marginTop: 42,
  },
});
