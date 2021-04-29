import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import notification from "antd/es/notification";
import NavMenuLayout from "../../../utils/NavMenuLayout";
import ProductCard from "./ProductCard";
import UpdateProduct from "./UpdateProduct";
import { StyleSheet, css } from "aphrodite-jss";
import Button from "antd/es/button";

const handleErrorNotification = (message, description) =>
  notification.error({ message, description });

const Products = () => {
  const [productArr, setproductArr] = useState([]);
  const [addProductModalVisible, toggleAddProductModalVisible] = useState(
    false
  );
  useEffect(() => {
    axios
      .get(`/products/getall`)
      .then((res) => setproductArr(res.data.data))
      .catch((err) => handleErrorNotification("Error in fetching", err));
  }, []);

  const ButtonsList = () => {
    return (
      <div className={css(styles.buttonContainer)}>
        <Button
          type="primary"
          onClick={() => toggleAddProductModalVisible(true)}
        >
          Add Product
        </Button>
      </div>
    );
  };

  return (
    <NavMenuLayout>
      <ButtonsList />
      <div className={css(styles.productContainer)}>
        {productArr.map((prod) => (
          <ProductCard
            key={prod._id}
            product={prod}
            setproductArr={setproductArr}
            // toggleModalVisible={toggleModalVisible}
          ></ProductCard>
        ))}
      </div>
      <UpdateProduct
        type={"add"}
        product={{}}
        visible={addProductModalVisible}
        toggleVisible={toggleAddProductModalVisible}
        setproductArr={setproductArr}
      />
    </NavMenuLayout>
  );
};

export default Products;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: "20px 40px 0px 40px",
    display: "flex",
    flexDirection: "row",
  },
  productContainer: {
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
});
