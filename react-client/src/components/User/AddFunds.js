import React, { useEffect } from "react";
import Button from "antd/es/button";
import Form from "antd/es/form";
import message from "antd/es/message";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite-jss";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import UniInput from "../../UniStyles/UniInput";
import axios from "../../utils/axios";
import { DollarOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal";
import { Input, InputNumber } from "antd";
import { getUserDetails } from "../../utils";

let user = JSON.parse(localStorage.getItem("user_data_TCS"));

const AddFunds = ({ visible, handleCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get(`/profile/getUser/${user.user._id}`).then((res) =>
      form.setFieldsValue({
        funds: res.data.data.funds,
      })
    );
  }, []);

  const onFinish = (values) => {
    axios
      .put("/profile/addFunds", { _id: user.user._id, ...values })
      .then((res) => {
        if (res.status === 200) {
          message.success("Funds added successfully!");
          handleCancel();
        }
      });
  };

  return (
    <Modal
      bodyStyle={{
        height: "30vh",
        // padding: 64,
        backgroundColor: "#F5F8FA",
        display: "flex",
        flexDirection: "column",
      }}
      width="20%"
      // title={false}
      visible={visible}
      closable={false}
      footer={false}
      onCancel={handleCancel}
    >
      <div className={css(styles.container)}>
        <div className={css(styles.branding)}>
          <UniText color="#0091ae" weight="bold" size={20}>
            {"AKASH AND KISHORE'S BANK"}
          </UniText>
        </div>
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
            name="funds"
            rules={[
              {
                required: true,
                message: "Please input your desired funds!",
              },
            ]}
          >
            <InputNumber
              min={0}
              size="large"
              prefix={<DollarOutlined className={css(styles.icon)} />}
              placeholder="Funds"
            />
          </Form.Item>

          <Button htmlType="submit" className={css(styles.submit)}>
            Add funds
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddFunds;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // height: "100vh",
    paddingTop: "15%",
  },
  formContainer: {
    padding: "0 24px",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  submit: {
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
  branding: {
    paddingBottom: "40px",
  },
});
