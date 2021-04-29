import React, { useState } from "react";
import { css, StyleSheet } from "aphrodite-jss";
import UniText from "../../UniStyles/UniText";
import { Badge, Button, Switch } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
const ButtonGroup = Button.Group;

const CartItem = ({ product, setCart }) => {
  let { _id } = product;

  return (
    <div className={css(styles.cartItem)}>
      <img
        alt="example"
        src="https://image.flaticon.com/icons/png/512/1261/1261163.png"
        width="120"
        height="auto"
      />
      <div className={css(styles.dualContainers)}>
        <div className={css(styles.infoContainer)}>
          <UniText size={20} weight={"600"}>
            {product.name}
          </UniText>
          <ButtonGroup>
            <Button
              onClick={() => {
                console.log("Plus Clicked");
                setCart((prevCart) => {
                  const exist = prevCart.find((obj) => obj._id == _id);
                  return prevCart.map((obj) =>
                    obj._id == _id
                      ? { ...exist, quantity: exist.quantity - 1 }
                      : obj
                  );
                });
              }}
            >
              <MinusOutlined />
            </Button>
            <Button>{product.quantity}</Button>
            <Button
              onClick={() => {
                console.log("Plus Clicked");
                setCart((prevCart) => {
                  const exist = prevCart.find((obj) => obj._id == _id);
                  return prevCart.map((obj) =>
                    obj._id == _id
                      ? { ...exist, quantity: exist.quantity + 1 }
                      : obj
                  );
                });
              }}
            >
              <PlusOutlined />
            </Button>
          </ButtonGroup>
        </div>
        <div className={css(styles.costContainer)}>
          <UniText size={20} weight={"700"}>
            {" "}
            Cost ${product.price * product.quantity}
          </UniText>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: "20px",
    margin: "20px 0px",
    backgroundColor: "#efefef",
    height: "150px",
    display: "flex",
    flexDirection: "row",
    border: "1px solid #d9d9d9",
    borderRadius: "3px",
  },
  infoContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dualContainers: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  costContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
