import React, { useEffect, useState } from "react";
import EmployeeMenuLayout from "../../utils/EmployeeMenuLayout";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import { StyleSheet, css } from "aphrodite-jss";
import axios from "../../utils/axios";
import message from "antd/es/message";

import Drawer from "antd/es/drawer";
import { Input } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Invoice from "./Invoice";

const { Search } = Input;

const searchOrders = (keyword, invoiceArr) => {
  return invoiceArr.filter((obj) =>
    obj.status.toLowerCase().includes(keyword.toLowerCase())
  );
};

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const dataSource = searchOrders(searchKey, orders);

  useEffect(() => {
    axios.get(`/orders/getall`).then((res) => setOrders(res.data.data));
  }, []);

  return (
    <EmployeeMenuLayout>
      <div className={css(styles.searchBar)}>
        <Search
          placeholder="Search for Orders By status"
          onChange={(e) => setSearchKey(e.target.value)}
          style={{ width: "600px" }}
        />
      </div>
      <div className={css(styles.invoiceContainer)}>
        {dataSource.map((obj) => (
          <Invoice key={obj._id} order={obj} setOrders={setOrders} />
        ))}
      </div>
    </EmployeeMenuLayout>
  );
};

export default OrderStatus;

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
