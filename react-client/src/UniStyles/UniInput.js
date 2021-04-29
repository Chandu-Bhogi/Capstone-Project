import { StyleSheet, css } from "aphrodite-jss";
import PropTypes from "prop-types";
import React from "react";
import Input from "antd/es/input";
import UniText, { globalStyles } from "./UniText";

const UniInput = (props) => {
    const {
        type,
        label,
        required,
        style: inputStyle,
        containerStyle,
        size,
        ...restProps
    } = props;

    return (
        <div className={css(styles.container, containerStyle)}>
            {label ? (
                <UniText size={13} weight="700">
                    {required ? <UniText color="red">*</UniText> : null} {label}
                </UniText>
            ) : null}
            {type === "textarea" ? (
                <Input.TextArea {...restProps} />
            ) : (
                <Input
                    size={size || "large"}
                    type={type === "password" ? "password" : null}
                    {...restProps}
                />
            )}
        </div>
    );
};

const styles = StyleSheet.create({
    container: {
        "& .ant-input-affix-wrapper": {
            height: "fit-content",
            borderRadius: 5,
        },
        "& .ant-input": {
            height: "36px",
            borderColor: globalStyles.borderGrey,
        },
        "& .ant-input-group-addon": {
            borderColor: globalStyles.borderGrey,
            backgroundColor: globalStyles.lightBlue,
            color: "#7B8793",
        },
        "& .ant-input-lg": {
            height: "36px",
        },
    },
});

UniInput.defaultProps = {
    type: "input",
    label: null,
    required: false,
};

UniInput.propTypes = {
    type: PropTypes.oneOf(["input", "textarea", "password"]),
    label: PropTypes.string,
    required: PropTypes.bool,
};

export default UniInput;
