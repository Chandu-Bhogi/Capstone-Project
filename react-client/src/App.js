import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { withCookies } from "react-cookie";
import "antd/dist/antd.css";

import "./App.less";
import Spin from "antd/es/spin";
import { css, StyleSheet } from "aphrodite-jss";
import Routes from "./Routes";

const App = (props) => {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className={css(styles.container)}>
            <Spin size="large" />
          </div>
        }
      >
        <Routes {...props} />
      </Suspense>
    </div>
  );
};

export default withCookies(App);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50vh",
    left: "50vw",
  },
});
