import React, { useState, useEffect } from "react";
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

const { Search } = Input;

export const deepGet = (obj) => (path, defaultReturn) => {
  if (obj === undefined) return defaultReturn;

  var paths = path.split("."),
    current = obj,
    i;
  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return defaultReturn || undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
};

const useStateWithSessionStorage = (sessionStorageKey, initVal) => {
  const [value, setValue] = React.useState(
    JSON.parse(sessionStorage.getItem(sessionStorageKey)) || initVal
  );

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

const searchBatches = (keyword, productArr) => {
  return productArr.filter((obj) =>
    obj.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

const UserDashboard = ({ userType, user }) => {
  const [productArr, setProductArr] = useState([]);
  const [cartSiderVisible, toggleCartSiderVisible] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [cart, setCart] = useState([]);

  const dataSource = searchBatches(searchKey, productArr);
  let total = cart.reduce((acc, obj) => acc + obj.price * obj.quantity, 0);

  useEffect(() => {
    axios
      .get("/products/getall")
      .then((res) => setProductArr(res.data.data))
      .catch((err) => message.error(err));

    axios
      .get(`/cart/getusercart?_id=${user.user._id}`)
      .then((res) => {
        let incomingCart = res.data.data ? res.data.data[0].cart : [];
        setCart(incomingCart);
      })
      .catch((err) => message.error(err));
  }, []);

  // useEffect(() => {}, []);

  return (
    <UserMenuLayout>
      <div className={css(styles.body)}>
        <div className={css(styles.searchBar)}>
          <Search
            placeholder="Search for products"
            onChange={(e) => setSearchKey(e.target.value)}
            style={{ width: "600px", paddingRight: "200px" }}
          />
          <span>
            <AiOutlineShoppingCart
              className={css(styles.icon)}
              onClick={() => toggleCartSiderVisible(true)}
            />
            <UniText size={20} weight={"700"}>
              Cart
            </UniText>
          </span>
        </div>

        <div className={css(styles.productContainer)}>
          {dataSource.map((prod) => (
            <ProductCardUser
              key={prod._id}
              product={prod}
              setCart={setCart}
              toggleCartSiderVisible={toggleCartSiderVisible}
            />
          ))}
        </div>
      </div>
      <Drawer
        visible={cartSiderVisible}
        bodyStyle={{ padding: 0 }}
        maskClosable
        width="30vw"
        onClose={() => toggleCartSiderVisible(false)}
        closable={false}
        destroyOnClose
      >
        <Cart cart={cart} user={user} setCart={setCart} total={total} />
      </Drawer>
    </UserMenuLayout>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  body: {
    padding: "20px",
    height: "calc(100vh - 42px)",
  },
  productContainer: {
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  searchBar: {
    padding: "0px 40px",
    display: "flex",
    justifyContent: "space-between",
  },
  icon: {
    paddingTop: "10px",
    width: "40px",
    height: "40px",
  },
});
