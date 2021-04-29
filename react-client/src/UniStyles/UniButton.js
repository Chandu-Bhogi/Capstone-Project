import React from "react";
import Button from "antd/es/button";
import { css, StyleSheet } from "aphrodite-jss";
import PropTypes from "prop-types";
import Spin from "antd/es/spin";
import UniText, { globalStyles } from "./UniText";

const buttonStyles = {
    primary: {
        backgroundColor: globalStyles.primary,
        color: "#FFF",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px ${globalStyles.primary} solid`,
        "&:hover": {
            backgroundColor: "#FFF",
            borderColor: globalStyles.primary,
            color: globalStyles.primary,
            opacity: 0.8,
        },
        "&:focus": {
            backgroundColor: globalStyles.primary,
            color: "#FFF",
            border: `1px ${globalStyles.primary} solid`,
        },
    },
    "primary-ghost": {
        backgroundColor: "#FFF",
        color: globalStyles.primary,
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px ${globalStyles.primary} solid`,
        "&:hover": {
            backgroundColor: globalStyles.primary,
            opacity: 0.8,
        },
        "&:focus": {
            backgroundColor: "#FFF",
            color: globalStyles.primary,
            border: `1px ${globalStyles.primary} solid`,
        },
    },
    secondary: {
        backgroundColor: globalStyles.secondary,
        color: "#FFF",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px ${globalStyles.secondary} solid`,
        "&:hover": {
            backgroundColor: "#FFF",
            borderColor: globalStyles.secondary,
            color: globalStyles.secondary,
            opacity: 0.8,
        },
        "&:focus": {
            backgroundColor: globalStyles.secondary,
            color: "#FFF",
            border: `1px ${globalStyles.secondary} solid`,
        },
    },
    "secondary-ghost": {
        backgroundColor: "#FFF",
        color: globalStyles.secondary,
        height: "36px",
        border: `1px ${globalStyles.secondary} solid`,
        "&:hover": {
            backgroundColor: globalStyles.secondary,
            opacity: 0.8,
        },
        "&:focus": {
            backgroundColor: "#FFF",
            color: globalStyles.secondary,
            border: `1px ${globalStyles.secondary} solid`,
        },
    },
    link: {
        backgroundColor: "transparent",
        color: "#307DD0",
        padding: 0,
        minWidth: "fit-content",
        "&:hover": {
            backgroundColor: "transparent",
            borderWidth: 0,
            color: "#307DD0",
        },
        "&:focus": {
            backgroundColor: "transparent",
            color: "#307DD0",
            // boxShadow: "none",
        },
    },
    chip: {
        padding: 0,
        height: 36,
        minWidth: 36,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};

const getButtonStyles = (type) => buttonStyles[type] || {};

const getGhostButtonStyles = (type, ghost, fill) => {
    let extendstyles = {};
    if (ghost && Object(buttonStyles).hasOwnProperty(`${type}-ghost`)) {
        extendstyles = buttonStyles[`${type}-ghost`];
    }
    if (fill) {
        extendstyles = {
            ...extendstyles,
            backgroundColor: fill + globalStyles.transparency,
            color: fill,
        };
    }

    return extendstyles;
};

const createStyles = (type, ghost, fill) =>
    StyleSheet.create({
        container: {
            padding: "8px 16px 6px 16px",
            height: "fit-content",
            minWidth: 150,
            border: 0,
            boxShadow: "none",
            pointerEvents: "initial",
            ...getButtonStyles(type),
            ...getGhostButtonStyles(type, ghost, fill),
        },
        small: {
            minWidth: "auto",
        },
        textStyle: {
            // lineHeight: 1,
            // paddingTop: 3,
            textShadow: "none",
        },
        spin:{
            "& .ant-spin-dot-item": {
                backgroundColor:"white"
            }
        }
    });

const UniButton = (props) => {
    const {
        children,
        text,
        type = "primary",
        small,
        style,
        ghost,
        fontSize,
        fill,
        loading,
        ...rest
    } = props;

    const styles = createStyles(type, ghost, fill);

    return (
        <Button
            type="primary"
            className={css(styles.container, small ? styles.small : {}, style)}
            {...rest}
        >
            {loading ? <Spin size="small" className={css(styles.spin)}/> : 
                typeof children === "string" || text ? (
                <UniText
                    size={fontSize || 14}
                    weight={type === "link" ? "normal" : "800"}
                    containerStyle={styles.textStyle}
                >
                    {text || children}
                </UniText>
            ) : (
                children
            )}
        </Button>
    );
};

export default UniButton;

UniButton.defaultProps = {
    type: "primary",
    text: "",
};

UniButton.propTypes = {
    type: PropTypes.oneOf([
        "primary",
        "secondary",
        "primary-ghost",
        "secondary-ghost",
        "text",
        "link",
        "chip",
    ]),
    text: PropTypes.string,
};
