import React, { useContext, useState } from "react";
import message from "antd/es/message";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite-jss";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import { AuthContext, userRoles } from "../../Routes";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginIcon } from "../../Icons";
import UniInput from "../../UniStyles/UniInput";
import UniButton from "../../UniStyles/UniButton";
import Radio from "antd/es/radio";
import axios from "../../utils/axios";
import { IoMdReturnRight } from "react-icons/io";
import { Form, Input, Button, Checkbox, Divider, Upload, Modal } from "antd";

const InstiComponent = ({ label, checked, isLast, onChange }) => (
  <div
    className={css(
      styles.instiContainer,
      checked && styles.checkedInstiContainer,
      isLast && styles.lastInstiContainer
    )}
    onClick={onChange}
  >
    <Radio checked={checked}>
      <UniText size={14}>{label}</UniText>
    </Radio>
  </div>
);

const Login = () => {
  const { login: loginHandler } = useContext(AuthContext);
  const [showForgotPassword, toggleForm] = useState(false);
  const [showLoader, toggleLoader] = useState(false);

  let domainData = localStorage.getItem("domain_data");
  domainData = domainData ? JSON.parse(domainData) : {};

  const history = useHistory();

  const onFinish = (values) => {
    axios.post("/auth/login", values).then((response) => {
      if (response.status == 200) {
        const loginDetails = response.data;
        const currentUserRole = userRoles[loginDetails.user.user_type]; //Admin:0, Employee:1, User:3
        loginHandler(loginDetails);

        history.push(`/${currentUserRole}/dashboard`);
        console.log(currentUserRole);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const BrandingLoginDiv = () => {
    return (
      <div className={css(styles.branding)}>
        <UniText color="#0091ae" weight="bold" size={32}>
          {domainData.name || "AKASH AND KISHORE'S GROCERS"}
        </UniText>
      </div>
    );
  };
  const handleImageError = () => {
    <BrandingLoginDiv />;
  };

  return (
    <div className={css(domainData.org_id ? styles.bodyWhite : styles.body)}>
      <div className={css(styles.container)}>
        {domainData.org_id ? (
          <div className={css(styles.imgBottomContainer)}>
            <UniText color="#0091ae" weight="bold" size={24}>
              {domainData.name || "AKASH AND KISHORE'S GROCERS"}
            </UniText>
          </div>
        ) : (
          <BrandingLoginDiv />
        )}
        {/* <UniText size={18} weight={"800"} containerStyle={styles.headerText}>
          {showForgotPassword ? "Forgot Password" : "Login to continue"}
        </UniText> */}
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className={css(styles.icon)} />}
              placeholder="E-Mail or Phone Number"
            />
          </Form.Item>
          <>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className={css(styles.icon)} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </>
          <UniButton
            htmlType="submit"
            type="secondary"
            style={styles.submit}
            loading={showLoader}
            text={"Log In"}
          />
          <div
            className={css(styles.bottomContext)}
            onClick={() => toggleForm(!showForgotPassword)}
          >
            <UniText size={16} weight="700" color="#307DD0">
              {!showForgotPassword ? "Forgot Password?" : "Back to LOGIN?"}
            </UniText>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    backgroundColor: globalStyles.lightBlue,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
  },
  bodyWhite: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-60%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 810px)": {
      height: "100%",
      width: "100%",
      padding: "0px 16px",
    },
  },
  headerText: {
    marginBottom: "20px",
    "@media (max-width: 810px)": {
      paddingLeft: 0,
    },
  },
  imgContainer: {
    width: "400px",
    height: "100px",
    "@media (max-width: 810px)": {
      width: "100vw",
      padding: "0 16px",
    },
  },
  imgBottomContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "25px",
    width: "300px",
    height: "100px",
    "@media (max-width: 810px)": {
      width: "100vw",
      padding: "0 16px",
    },
  },
  submit: {
    width: "100%",
  },
  formContainer: {
    width: "300px",
    margin: "0 auto",
    "@media (max-width: 810px)": {
      width: "100%",
      padding: "0px",
    },
  },
  bottomContext: {
    textAlign: "center",
    marginTop: 20,
    cursor: "pointer",
  },
  icon: {
    color: "#a4a4a4",
    margin: "0 8px",
  },
  selectInstiContainer: {
    margin: "20px 0",
    maxHeight: 150,
    overflow: "auto",
  },
  instiContainer: {
    backgroundColor: "#F5F8FA",
    padding: "6px 16px",
    borderRadius: 5,
    marginBottom: 12,
    "& .ant-radio": {
      marginRight: 10,
    },
    border: "1px #F5F8FA solid",
    cursor: "pointer",
    "&:hover": {
      borderColor: globalStyles.primary,
    },
  },
  lastInstiContainer: {
    marginBottom: 0,
  },
  checkedInstiContainer: {
    borderColor: globalStyles.secondary,
  },
  backButton: {
    minWidth: "fit-content",
    position: "absolute",
    left: 39,
    top: 33,
  },
  backContentDiv: {
    display: "flex",
    justifyContent: "center",
  },
  backIcon: {
    width: 18,
    height: "auto",
    marginRight: 8,
    transform: "rotate(180deg)",
  },
  noticeContainer: {
    backgroundColor: globalStyles.primary + globalStyles.transparency,
    textAlign: "center",
    width: "fit-content",
    padding: "20px 40px",
    margin: "0px auto",
    position: "absolute",
    bottom: 40,
    borderRadius: 5,
    border: `1px ${globalStyles.errorRed} solid`,
  },
  branding: {
    paddingBottom: "40px",
  },
});
