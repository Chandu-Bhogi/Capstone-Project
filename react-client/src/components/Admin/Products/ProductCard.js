import { Card } from "antd";
import { StyleSheet, css } from "aphrodite-jss";
import React, { useState, useEffect } from "react";
import Button from "antd/es/button";
import { Popconfirm, message } from "antd";
import UpdateProduct from "./UpdateProduct";
import axios from "axios";

const { Meta } = Card;

const ProductCard = ({ product, setproductArr }) => {
  const [modalVisible, toggleModalVisible] = useState(false);

  const confirm = () => {
    axios.delete(`/products/delete/${product._id}`)
    .then(res => {
      setproductArr(prevState => prevState.filter(obj => obj._id !== product._id))
      message.success(res.data.message)})
    .catch(err => message.error(err))
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
          description={`Price: ${product.price}, Quantity: ${product.quantity}`}
        />

        <div className={css(styles.buttons)}>
          <Button
            type="secondary"
            onClick={() => {
              console.log(product._id);
              toggleModalVisible(true);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure to delete this product from inventory?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
          ;
        </div>
      </Card>
      <UpdateProduct
        type={"update"}
        visible={modalVisible}
        toggleVisible={toggleModalVisible}
        product={product}
        setproductArr={setproductArr}
      />
    </div>
  );
};

export default ProductCard;

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
});
