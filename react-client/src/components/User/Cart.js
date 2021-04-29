import React, { useEffect } from "react";
import { css, StyleSheet } from "aphrodite-jss";
import CartItem from "./CartItem";
import axios from "../../utils/axios";
import { useState } from "react";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import { Button } from "antd";
import message from "antd/es/message";
import { v4 as uuidv4 } from "uuid";

export const shallowGet = (obj) => (path, defaultReturn) => {
  if (obj === undefined) return defaultReturn;

  var paths = path,
    current = obj,
    i;
  if (current[paths] == undefined) {
    return defaultReturn;
  } else {
    current = current[paths];
  }
  return current;
};

const Cart = ({ cart, user, setCart, total }) => {
  return (
    <div className={css(styles.cartContainer)}>
      <div className={css(styles.header)}>CART</div>
      {cart.map((prod) => (
        <CartItem product={prod} key={prod._id} setCart={setCart} />
      ))}
      <div className={css(styles.totalContainer)}>
        <UniText size={20} weight={"600"}>
          Total: {total}
        </UniText>
      </div>
      <div className={css(styles.checkoutButton)}>
        <Button
          type="primary"
          onClick={() => {
            axios
                  .post(`/cart/createCart/${user.user._id}`, {
                    cart: cart,
                  })
                  .then((res) => console.log("added"))
                  .catch((err) => message.error(err));

            axios
              .post(`/orders/createorder`, {
                _id: uuidv4(),
                user_id: user.user._id,
                total_bill: total,
                status: "billed",
                list: cart,
              })
              .then((res) => message.success("Successfully Created the order"))
              .catch((err) => message.error(err));
          }}
        >
          {" "}
          Check Out
        </Button>
        <Button
          type="danger"
          onClick={() => {
            axios
              .delete(`/cart/deleteusercart/${user.user._id}`)
              .then((res) => message.success("Successfully deleted"))
              .catch((err) => message.error(err));
          }}
        >
          {" "}
          Delete Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartContainer: {
    padding: "20px",
    height: "calc(100vh - 42px)",
    display: "flex",
    flexDirection: "column",
  },
  header: {},
  totalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: "15px",
    paddingTop: "10px",
  },
  checkoutButton: {
    bottom: "0px",
  },
});
