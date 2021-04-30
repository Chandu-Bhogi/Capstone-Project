import React, { useEffect, useState } from "react";
import UserMenuLayout from "../../utils/UserMenuLayout";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import { StyleSheet, css } from "aphrodite-jss";
import axios from "../../utils/axios";
import message from "antd/es/message";
import ProductCardUser from "./ProductCardUser";
import CartSider from "./CartSider";
import Drawer from "antd/es/drawer";
import { Input } from "antd";
import Cart from "./Cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Invoice from "./Invoice";

const { Search } = Input;

const searchInvoices = (keyword, invoiceArr) => {
  return invoiceArr.filter((obj) =>
    obj.status.toLowerCase().includes(keyword.toLowerCase())
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const dataSource = searchInvoices(searchKey, orders);

  useEffect(() => {
    axios.get(`/orders/getall`).then((res) => setOrders(res.data.data));
  }, []);

  return (
    <UserMenuLayout>
      <div className={css(styles.searchBar)}>
        <Search
          placeholder="Search for products"
          onChange={(e) => setSearchKey(e.target.value)}
          style={{ width: "600px" }}
        />
      </div>
      <div className={css(styles.invoiceContainer)}>
        {orders.map((obj) => (
          <Invoice key={obj._id} order={obj} />
        ))}
      </div>
    </UserMenuLayout>
  );
};

export default Orders;

const styles = StyleSheet.create({
  searchBar: {
    padding: "20px 20px 0px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    paddingTop: "10px",
    width: "40px",
    height: "40px",
  },
  invoiceContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
});
