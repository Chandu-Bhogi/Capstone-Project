import React from "react";
import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";

const UniText = (props) => {
    const { children, containerStyle, tooltip, id } = props;
    const styles = createStyles(props);

    return (
        <div
            title={tooltip}
            className={css(styles.container, containerStyle)}
            id={id}
        >
            {children}
        </div>
    );
};

const createStyles = ({
    size,
    color,
    weight,
    lineheight,
    display,
    center,
    nowrap,
}) =>
    StyleSheet.create({
        container: {
            display,
            fontSize: size,
            fontWeight: weight,
            color: getColor(color),
            lineHeight: `${getLineHeight(size, lineheight)}px`,
            textAlign: center ? "center" : "left",
            whiteSpace: nowrap && "nowrap",
        },
    });

const getLineHeight = (size, lineHeight) =>
    lineHeight || lineHeights[size] || 16;

const lineHeights = {
    10: 12,
    12: 16,
    14: 20,
    16: 20,
    18: 24,
    20: 28,
    24: 32,
    34: 48,
    48: 64,
};

const getColor = (color) =>
    colorTemplate.hasOwnProperty(color) ? colorTemplate[color] : color;

const colorTemplate = {
    textBlack: "#33475B",
    primary: "#FF7A59",
    secondary: "#0091AE",
    blue: "#5680EC",
    grey: "#E5E5E5",
    darkGrey: "#686666",
    lightBlue: "#F5F8FA",
    borderGrey: "#CBD6E2",
    errorRed: "#D74D5A",
    ternary: "#FF7A59",
    transparency: 50,
    correctGreen: "#00d000",
};

UniText.defaultProps = {
    size: 16,
    color: null,
    weight: "normal",
    display: "inline-block",
    tooltip: null,
};

UniText.propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    weight: PropTypes.string,
    tooltip: PropTypes.string,
};

export default UniText;
export { colorTemplate as globalStyles };
