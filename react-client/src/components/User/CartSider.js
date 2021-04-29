import React from "react";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;

const CartSider = ({ visible, toggleSider }) => {
  return (
    <Sider width="200px" trigger={null} collapsible collapsed={visible}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default CartSider;
