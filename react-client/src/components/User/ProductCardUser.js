import { Card } from "antd";
import { StyleSheet, css } from "aphrodite-jss";
import React, { useState, useEffect } from "react";
import Button from "antd/es/button";
import { Popconfirm, message } from "antd";
import axios from "axios";

const { Meta } = Card;

const ProductCardUser = ({
  product,
  setproductArr,
  toggleCartSiderVisible,
  setCart,
}) => {
  //   const [siderVisible, toggleSiderVisible] = useState(false);

  const confirm = () => {
    axios
      .delete(`/products/delete/${product._id}`)
      .then((res) => {
        setproductArr((prevState) =>
          prevState.filter((obj) => obj._id !== product._id)
        );
        message.success(res.data.message);
      })
      .catch((err) => message.error(err));
  };

  const cancel = () => {
    message.error("Operation Cancelled");
  };

  return (
    <div className={css(styles.cardMeta)}>
      <Card
        hoverable={true}
        style={{ width: 250, border: "1px solid #e1e1e1" }}
        cover={
          <img
            alt="example"
            src="https://image.flaticon.com/icons/png/512/1261/1261163.png"
            width="249"
            height="auto"
          />
        }
      >
        <Meta
          style={{ padding: "1rem" }}
          title={product.name}
          description={`Price: ${product.price}`}
        />

        <div className={css(styles.buttons)}>
          <Button
            className={css(styles.addToCartBtn)}
            type="primary"
            onClick={() => {
              message.success(`${product.name} added to cart`);
              setCart((prevState) => {
                product.quantity = 1;
                return [...prevState, product];
              });
              //   toggleCartSiderVisible(true);
            }}
          >
            Add To Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardUser;

const styles = StyleSheet.create({
  cardMeta: {
    // boxShadow: "5px 5px 5px #e1e1e1",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  addToCartBtn: {
    padding: "0px 60px",
  },
});
