import React from "react";
import Button from "antd/es/button";
import Form from "antd/es/form";
import message from "antd/es/message";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite-jss";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import UniInput from "../../UniStyles/UniInput";
import axios from "../../utils/axios";

const Register = () => {
  const onFinish = (values) => {
    axios
      .post("/auth/orgRegister", {
        ...values,
        country_code: "+91",
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("Account created successfully!");
        }
      });
  };

  return (
    <div className={css(styles.container)}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
        layout="vertical"
        hideRequiredMark
        className={css(styles.formContainer)}
      >
        <Form.Item
          name="org_name"
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
          <UniInput placeholder="Institute Name" />
        </Form.Item>
        <UniText size={16}>Your Details</UniText>
        <div className={css(styles.inlineFields)}>
          <Form.Item
            name="first_name"
            rules={[
              {
                type: "string",
                message: "Name must only contain alphabets!",
              },
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <UniInput placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              {
                type: "string",
                message: "Name must only contain alphabets!",
              },
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <UniInput placeholder="Last Name" />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <UniInput placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your mobile number!",
            },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a correct number!",
            },
          ]}
        >
          <UniInput addonBefore="+91" placeholder="Mobile" />
        </Form.Item>
        <Button htmlType="submit" className={css(styles.submit)}>
          Create Account
        </Button>
        <div className={css(styles.bottomContext)}>
          <UniText size={16}>Already a user?</UniText>
          <Link to="/"> LOGIN</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    paddingTop: "10%",
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
