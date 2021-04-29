import React from "react";
import NavMenuLayout from "../../utils/NavMenuLayout";
import UniText, { globalStyles } from "../../UniStyles/UniText";
import { StyleSheet, css } from "aphrodite-jss";

const Dashboard = () => {
  return (
    <NavMenuLayout>
      <div className={css(styles.body)}>
        <UniText size={26}> HEY THIS IS ADMIN PANEL </UniText>
      </div>
    </NavMenuLayout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  body: {
    padding: "20px",
    height: "calc(100vh - 42px)",
  },
});
