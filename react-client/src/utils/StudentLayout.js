import React, { useState, useContext, useEffect } from "react";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import { Link, useLocation } from "react-router-dom";
import {
    RiSurveyLine,
    RiBarChart2Line,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { css, StyleSheet } from "aphrodite-jss";
import "./custom.css";
import { AuthContext } from "../Routes";
import loginIcon from "../../assets/loginIcon.svg";
import axios from "Utils/axios";

const StudentLayout = ({ children }) => {
    const { logout: handleLogout } = useContext(AuthContext) || {};
    const location = useLocation();
    const [selectedRoute, setSelectedRoute] = useState(location.pathname);
    let domainData = localStorage.getItem("domain_data");
    domainData = domainData ? JSON.parse(domainData) : {};

    const BrandingLoginDiv = () => {
        return (
            <div className={css(styles.imgContainer)}>
                <LoginIcon width="100%" height="100%" />
            </div>
        );
    };

    const handleImageError = () => {
        <BrandingLoginDiv />;
    };

    return (
        <Layout className={css(styles.bodyLayout)}>
            <div className={"menuSidebar"}>
                {domainData.org_id ? (
                    <div className={css(styles.imgNavContainer)}>
                        <img
                            src={domainData.logo_url || loginIcon}
                            alt="ALL TEST MAKER"
                            onError={handleImageError}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        ></img>
                    </div>
                ) : (
                    <div className={css(styles.logo)}>
                        <p className="m-0">ALL</p>
                        <div>
                            <span style={{ color: "#07f" }}>TEST</span>
                            <span>MAKER</span>
                        </div>
                    </div>
                )}
                <Menu
                    onClick={(e) => {
                        setSelectedRoute(e.key);
                    }}
                    selectedKeys={[selectedRoute]}
                    mode="vertical"
                    theme="light"
                    className={"student-sidemenu"}
                    style={{
                        background: "#fff",
                        fontSize: "16px",
                        border: 0,
                    }}
                >
                    <Menu.Item key="/candidate/test">
                        <Link to="/candidate/test">
                            <RiSurveyLine size={16} /> &nbsp; Tests
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/candidate/results">
                        <Link to="/candidate/results">
                            <RiBarChart2Line size={16} /> &nbsp; Results
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/logout">
                        <div
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            <RiLogoutCircleLine size={16} /> &nbsp; Logout
                        </div>
                    </Menu.Item>
                </Menu>
            </div>
            <div style={{ flex: 1, minHeight: "100vh" }}>
                <Layout className={"mobileHeader"}>
                    <Link to="/candidate/test">Tests</Link>
                    <Link to="/candidate/results">Result</Link>
                    {/* <Link to="/results">Results</Link> */}
                    <div
                        style={{
                            flex: 1,
                            fontSize: "18px",
                            color: "#000",
                            justifyContent: "center",
                        }}
                        onClick={() => {
                            handleLogout();
                        }}
                        className={css(styles.logoutButton)}
                    >
                        Logout
                    </div>
                </Layout>
                <Layout
                    className="site-layout"
                    style={{ background: "transparent" }}
                >
                    {children}
                </Layout>
            </div>
        </Layout>
    );
};

export default StudentLayout;

const styles = StyleSheet.create({
    bodyLayout: {
        background: "#fcfcfc",
        display: "flex",
        flexDirection: "row",
        fontFamily: "'Segoe UI', Helvetica, Calibri, system-ui",
    },
    logo: {
        fontSize: "18px",
        padding: "1em",
        fontWeight: 700,
        letterSpacing: "1px",
        color: "#000",
    },
    logoutButton: {
        display: "flex",
        alignItems: "center",
        padding: 9,
        cursor: "pointer",
    },
    imgNavContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "56px",
        justifyContent: "center",
        margin: "8px 0px",
    },
});
