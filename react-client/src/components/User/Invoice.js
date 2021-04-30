import React, { useEffect, useState } from "react";
import { css, StyleSheet } from "aphrodite-jss";
import UniText from "../../UniStyles/UniText";
import message from "antd/es/message";
import axios from "../../utils/axios";
import dayjs from "dayjs";
import { Table } from "antd";


const Invoice = ({ order }) => {
  const [user, setUser] = useState({});
  const [preview, togglePreview] = useState(false);

  useEffect(() => {
    axios
      .get(`/profile/getUser/${order.user_id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => message.error(err));
  }, []);

  console.log(user);
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
        {order.status}
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
