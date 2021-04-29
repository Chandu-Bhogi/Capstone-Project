import React, { useState, useContext, useEffect } from "react";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import { Link, useLocation } from "react-router-dom";
import { css, StyleSheet } from "aphrodite-jss";
import UniText, { globalStyles } from "../UniStyles/UniText";
import { BiLogOut } from "react-icons/bi";
import { AuthContext, userRoleEnum, userRoles } from "../Routes";
import { Dropdown, Button, Input } from "antd";
import ChangePassword from "../components/Auth/ChangePassword";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSmallDash } from "react-icons/ai";


const AdminMenuArray = [
  {
    key: "dashboard",
    to: "/Admin/dashboard",
    title: "Dashboard",
  },
  {
    key: "products",
    to: "/Admin/products",
    title: "products",
  },
  {
    key: "employees",
    to: "/Admin/employees",
    title: "employees",
  },
  {
    key: "reports",
    to: "/Admin/reports",
    title: "reports",
  },
];

const UserMenuArray = [
  {
    key: "Cart",
    to: "/User/cart",
    title: "Cart",
  },
  {
    key: "Orders",
    to: "/User/orders",
    title: "Orders",
  },
  {
    key: "Profile",
    to: "/User/profile",
    title: "Profile",
  },
];

const NavMenuLayout = ({ children, showMenu = true }) => {
  let domainData = localStorage.getItem("domain_data");
  domainData = domainData ? JSON.parse(domainData) : {};

  const { user, logout: handleLogout } = useContext(AuthContext);
  const userType = userRoles[user.user.user_type];
  // const userType = userRoleEnum.Admin;
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");

  const [selectedRoute, setSelectedRoute] = useState(pathnameArray[2]);
  const [PasswordModal, togglePasswordModal] = useState(false);
  const [collapsed, toggleCollapsed] = useState(false);

  const handleClick = (e) => {
    setSelectedRoute(e.key);
  };

  const handleModal = () => {
    togglePasswordModal((prevState) => !prevState);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div
          onClick={() => {
            handleModal();
          }}
        >
          Change Password
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  const VerticalMenuItem = (menuArr) =>
    menuArr.map((item) => (
      <Menu.Item key={item.key}>
        <Link to={item.to}>
          <UniText
            color="#33475B"
            weight={selectedRoute === item.key ? "bold" : "normal"}
          >
            {item.title}
          </UniText>
        </Link>
      </Menu.Item>
    ));

  return (
    <React.Fragment>
      <Layout className={css(styles.mask)}>
        <Layout.Header className={css(styles.headerContainer)}>
          <div className={css(styles.branding)}>
            <div
              className={css(styles.burgerButton)}
              onClick={() => toggleCollapsed((prevState) => !prevState)}
            >
              {collapsed ? <GiHamburgerMenu /> : <AiOutlineSmallDash />}
            </div>
            <UniText color="#0091ae" weight="bold" size={24}>
              {domainData.name || "AKASH AND KISHORE'S GROCERS"}
            </UniText>
          </div>
          
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className={css(styles.logoutContainer)}>
                <BiLogOut className={css(styles.logoutIcon)} />
                <UniText size={16}>Account</UniText>
              </div>
            </a>
          </Dropdown>
        </Layout.Header>
        <Layout>
          {showMenu && (
            <Layout.Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width="200px"
              className={css(styles.container)}
            >
              <div className={css(styles.menuWrapper)}>
                {userType === userRoleEnum.Admin ? (
                  <Menu
                    onClick={handleClick}
                    selectedKeys={[selectedRoute]}
                    mode="vertical"
                  >
                    {VerticalMenuItem(AdminMenuArray)}
                  </Menu>
                ) : userType === userRoleEnum.User ? (
                  <Menu
                    onClick={handleClick}
                    selectedKeys={[selectedRoute]}
                    mode="vertical"
                    // style={{
                    //     backgroundColor: "#f5f8fa",
                    //     height: "100%",
                    // }}
                  >
                    {VerticalMenuItem(UserMenuArray)}
                  </Menu>
                ) : null}
              </div>
            </Layout.Sider>
          )}
          <Layout className={css(styles.layout)}>
            {/* <div className={css(styles.content)}> */}

            <Layout.Content>{children}</Layout.Content>
            {showMenu && userType === userRoleEnum.User ? (
              <div className={css(styles.bottomNav)}>
                <Menu
                  onClick={handleClick}
                  selectedKeys={[selectedRoute]}
                  mode="horizontal"
                  style={{
                    backgroundColor: "#f5f8fa",
                    width: "100%",
                  }}
                >
                  <Menu.Item key="/tests">
                    <Link to="/candidate/dashboard">Tests</Link>
                  </Menu.Item>
                  <Menu.Item key="/results">
                    <Link to="/candidate/results">Results</Link>
                  </Menu.Item>
                </Menu>
              </div>
            ) : null}
            {/* </div> */}
          </Layout>
        </Layout>
      </Layout>
      <ChangePassword
        visible={PasswordModal}
        handleCancel={handleModal}
      ></ChangePassword>
    </React.Fragment>
  );
};

export default NavMenuLayout;

const styles = StyleSheet.create({
  mask: {
    height: "100vh",
    "& .ant-layout-sider-children": {
      backgroundColor: "rgb(245, 248, 250)",
    },
  },
  headerContainer: {
    backgroundColor: "#f5f8fa",
    border: "1px #CBD6E2 solid",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "42px",
    padding: "10px 36px 10px 24px",
  },
  logoutContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  logoutIcon: {
    transform: "rotate(180deg)",
    width: 24,
    height: 24,
    marginRight: 8,
  },
  layout: {
    backgroundColor: "#ffff",
  },
  content: {
    height: "70%",
    marginTop: "100px",
    backgroundColor: "#F5F8FA",
  },
  container: {
    "@media  (max-width: 768px)": {
      display: "none",
    },
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    "@media (min-width: 600px)": {
      display: "none",
    },
    backgroundColor: globalStyles.secondary,
  },
  menuWrapper: {
    height: "100%",
    "& .ant-menu": {
      backgroundColor: "#F5F8FA",
      height: "100%",
    },
    "& .ant-menu-item": {
      paddingTop: 13,
      paddingBottom: 13,
      paddingLeft: 24,
      height: "auto",
    },
    "& .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected": {
      backgroundColor: "#FFD5CB",
      borderRight: `4px ${globalStyles.primary} solid`,
    },
    "& .ant-menu-item:hover a": {
      backgroundColor: "transparent",
    },
  },
  imgNavContainer: {
    display: "flex",
    alignItems: "center",
    width: "160px",
    height: "40px",
  },
  branding: {
    display: "flex",
    flexDirection: "row",
    height: "inherit",
  },
  burgerButton: {
    height: "40px",
    width: "40px",
    paddingRight: "20px",
  },
});
