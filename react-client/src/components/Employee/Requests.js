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

const Requests = () => {
  useEffect(() => {
    axios.get(`/orders/getall`).then((res) => setOrders(res.data.data));
  }, []);

  return (
    <EmployeeMenuLayout>
      
    </EmployeeMenuLayout>
  );
};

export default Requests;

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
