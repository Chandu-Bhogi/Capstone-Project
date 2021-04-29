import React from "react";
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

const ChangePassword = ({ visible, handleCancel }) => {
  const onFinish = (values) => {
    console.log(values);
    axios
      .put("/auth/changePassword", { ...getUserDetails(), ...values })
      .then((res) => {
        if (res.status === 200) {
          message.success("Password changed successfully!");
          handleCancel();
        }
      });
  };

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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
          hideRequiredMark
          className={css(styles.formContainer)}
        >
          <Form.Item
            name="old_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <UniInput
              size="small"
              prefix={<LockOutlined className={css(styles.icon)} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <UniInput
              size="small"
              prefix={<LockOutlined className={css(styles.icon)} />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <UniInput
              size="small"
              prefix={<LockOutlined className={css(styles.icon)} />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Button htmlType="submit" className={css(styles.submit)}>
            Change Password
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default ChangePassword;

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
