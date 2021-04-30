import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite-jss";
import UniText from "../../UniStyles/UniText";
import message from "antd/es/message";
import axios from "../../utils/axios";
import dayjs from "dayjs";
import { Table, Select } from "antd";

const { Option } = Select;

const Invoice = ({ order, setOrders }) => {
  const [user, setUser] = useState({});
  const [preview, togglePreview] = useState(false);

  useEffect(() => {
    axios
      .get(`/profile/getUser/${order.user_id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => message.error(err));
  }, []);

  function handleChange(value) {
    axios
      .put(`/orders/updateorder/${order._id}`, { status: value })
      .then((res) =>
        setOrders((prevOrders) =>
          prevOrders.map((obj) =>
            obj._id == order._id ? { ...obj, status: value } : obj
          )
        )
      )
      .catch((err) => message.error(err));
  }
  return (
    <div
      className={css(styles.invoice)}
      onClick={() => togglePreview((prevState) => !prevState)}
    >
      <div>
        <UniText size={18} weight={"700"}>
          Order Number:
        </UniText>{" "}
        {order._id}
      </div>
      <div>
        <UniText size={18} weight={"700"}>
          Order Time:
        </UniText>{" "}
        {dayjs(order.timestamp).format("YYYY-MM-DD hh:mm:ss")}
      </div>
      <div>
        <UniText size={18} weight={"700"}>
          Bill:
        </UniText>{" "}
        {order.total_bill}
      </div>
      <div>
        <UniText size={18} weight={"700"}>
          User Name:
        </UniText>{" "}
        {user.first_name}
      </div>
      <div>
        <UniText size={18} weight={"700"}>
          Status
        </UniText>{" "}
        <Select
          defaultValue={order.status}
          style={{ width: 120 }}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        >
          <Option value="pending">pending</Option>
          <Option value="cancelled">cancelled</Option>
          <Option value="shipped">shipped</Option>
          <Option value="delivered">delivered</Option>
          <Option value="billed">billed</Option>
          <Option value="inTransit">In Transit</Option>
        </Select>
      </div>
      {preview && (
        <div className={css(styles.cart)}>
          <UniText size={20} weight={"800"}>
            List of Purchase
          </UniText>
          <Table
            rowKey="_id"
            dataSource={order.list}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
              },
              {
                title: "Price",
                dataIndex: "price",
              },
              {
                title: "Cost",
                dataIndex: "price",
                render: (price, obj) => price * obj.quantity,
              },
            ]}
          ></Table>
          {/* {order.list.map((item) => (
            <div>{item.name}</div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  invoice: {
    // height: "200px",

    width: "600px",
    padding: "20px",
    margin: "20px",
    border: "1px solid #efefef",
    backgroundColor: "rgb(249 248 248)",

    "&:hover": {
      boxShadow: "rgb(130 130 142 / 27%) -1px -1px 20px 0px",
      transition: "0.2s",
    },
  },
  cart: {
    alignItems: "center",

    display: "flex",
    flexDirection: "column",
  },
});
